import axios from 'axios'
import * as cheerio from 'cheerio'
import { logger } from '../utils/logger.js'
import { playersData } from '../resources/players.js'
import { Season } from '../database/models.js'

export const updateOverallStatsForAllPlayers = async () => {
    await Promise.all(playersData.map(async (player) => {
        await updateOverallStats(player.playerName)
        logger(`Overall stats updated for ${player.playerName}`)
    }))
}

const updateOverallStats = async (player) => {
    const result = await getOverallStatsForPlayer(player)

    const overallSeason = await Season.findOne({ seasonName: 'Overall' })
    const playerStats = overallSeason.playerStats
    const playerIndex = playerStats.findIndex(stat => stat.playerName === player)

    playerStats[playerIndex] = { playerName: player, ...result }
    overallSeason.playerStats = playerStats

    await overallSeason.save()
}

const getOverallStatsForPlayer = async (player) => {
    const url = `https://r6.tracker.network/r6siege/profile/ubi/${player}/overview`
    const raw_data = await axios.get(url)
        .then(res => {
            return res.data
        }, error => {
            console.error(error)
        })

    const $ = cheerio.load(raw_data)

    let overallStats = []

    $('.playlist-all__stats .stat-rank').each(function (index, element) {
        const text = $(this).text().trim();

        const match = text.match(/^([a-zA-Z\s%]+)([\d,%.]+)/i);
        if (match) {
            const label = match[1].trim();
            let value = match[2].trim();
            value = value.replace('%', '');
            overallStats.push({ label, value });
        }
    });

    let playtime = 0;
    $('.overview .text-primary').each(function (index, element) {
        const text = $(this).text().trim();
        if (text.includes('h')) {
            playtime += parseFloat(text.replace('h', ''));
        }
    });

    let cleanedStats = cleanAndParseOverallStats(overallStats);
    cleanedStats = [...cleanedStats, { label: 'playTime', value: playtime }];

    const result = processOverallStats(cleanedStats);
    console.log(result);

    return result;
}

const cleanAndParseOverallStats = (stats) => {
    const result = stats.map(stat => {
        const label = stat.label.toLowerCase().replace(' ', '_');
        const value = parseFloat(stat.value.replace(',', ''));
        return { label, value };
    });

    return result;
}

const processOverallStats = (stats) => {
    const result = stats.reduce((acc, stat) => {
        const { label, value } = stat;
        if (label.includes('wins')) {
            acc.wins = value;
        } else if (label.includes('hs%')) {
            acc.hsRate = value;
        } else if (label.includes('matches')) {
            acc.matches = value;
        } else if (label == 'kills') {
            acc.kills = value;
        } else if (label.includes('deaths')) {
            acc.deaths = value;
        }
        else if (label.includes('playTime')) {
            acc.playTime = value;
        }
        acc.maxRank = 0;
        acc.currentRank = 0;
        return acc;
    }, {});

    return result;
}
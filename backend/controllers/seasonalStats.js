import axios from 'axios'
import * as cheerio from 'cheerio'
import { playersData } from '../resources/players.js'
import { Season } from '../database/models.js'
import { logger } from '../utils/logger.js'
import { seasonsData } from '../resources/seasons.js'

export const updateSeasonalStatsForAllPlayers = async () => {
    await Promise.all(playersData.map(async (player) => {
        await updateSeasonalStats(player.playerName)
        logger(`Seasonal stats updated for ${player.playerName}`)
    }))
}

const updateSeasonalStats = async (player) => {
    const result = await getSeasonalStastsFroPlayer(player)

    await Promise.all(result.map(async (r) => {
        const season = await Season.findOne({ seasonName: r.seasonName })
        const playerStats = season.playerStats
        const playerIndex = playerStats.findIndex(stat => stat.playerName === player)

        let stats = { ...r }
        delete stats.seasonName

        playerStats[playerIndex] = { playerName: player, ...stats }
        season.playerStats = playerStats
        await season.save()
    }))
}

export const getSeasonalStastsFroPlayer = async (player) => {
    const url = `https://r6.tracker.network/r6siege/profile/ubi/${player}/seasons?gamemode=pvp_ranked&page=1`
    const raw_data = await axios.get(url)
        .then(res => {
            return res.data
        }, error => {
            console.error(error)
        })

    const $ = cheerio.load(raw_data)

    let seasons_raw = []
    let raw_text = "";
    $('.stat-table-row .stat-value').each(function (index, element) {
        let text = $(this).text().trim();
        if (seasonsData.some(season => text.includes(season.seasonName)) && !text.includes(seasonsData[1].seasonName)) {
            seasons_raw.push(raw_text);
            raw_text = "";
        }

        if (text.includes('Top')) {
            text = text.slice(0, text.indexOf('Top'));
        }

        if (text.includes('Bottom')) {
            text = text.slice(0, text.indexOf('Bottom'));
        }

        raw_text += text + " ";
    });

    const result = parseStatsData(seasons_raw);

    return result;
}

function parseStatsData(rows) {
    return rows.map(row => {
        const parts = row.trim().split(/\s+/);

        if (parts.includes('N/A')) {
            return {
                seasonName: parts[0] + ' ' + parts[1],
                currentRank: 'NO RANK',
                maxRank: 'NO RANK',
                hsRate: 0,
                matches: 0,
                wins: 0,
                kills: 0,
                deaths: 0,
            };
        }

        let rankPositions = [];
        for (let i = 0; i < parts.length; i++) {
            if (parts[i].match(/(GOLD|COPPER|BRONZE|EMERALD|SILVER|NO RANK)/)) {
                rankPositions.push(i);
            }
        }

        const seasonWords = parts.slice(0, rankPositions[0]);
        const season = seasonWords.join(' ');

        function separateRankAndMmr(rankPart, nextPart) {
            if (rankPart.match(/[IVX]+\d/)) {
                const splitPoint = rankPart.search(/\d/);
                const rank = rankPart.slice(0, splitPoint);
                const mmr = parseInt(rankPart.slice(splitPoint).replace(',', ''));
                return [rank, mmr];
            } else {
                const mmr = parseInt(nextPart.replace(',', ''));
                return [rankPart, mmr];
            }
        }

        const [latestRankNum, latestMmr] = separateRankAndMmr(parts[rankPositions[0] + 1], parts[rankPositions[0] + 2]);
        const [maxRankNum, maxMmr] = separateRankAndMmr(parts[rankPositions[1] + 1], parts[rankPositions[1] + 2]);

        const latestRank = `${parts[rankPositions[0]]} ${latestRankNum}`;
        const maxRank = `${parts[rankPositions[1]]} ${maxRankNum}`;

        let kdIndex = -1;
        for (let i = rankPositions[1] + 2; i < parts.length; i++) {
            const num = parseFloat(parts[i]);
            if (!isNaN(num) && num > 0 && num < 5) {
                kdIndex = i;
                break;
            }
        }

        let currentIndex = kdIndex + 1;
        while (currentIndex < parts.length && (!parts[currentIndex].includes('%') || parts[currentIndex - 1].match(/Top|Bottom/))) {
            currentIndex++;
        }

        let statsArray = [];
        let i = currentIndex + 1;
        while (i < parts.length) {
            let cleanedPart = parts[i].replace(',', '');
            cleanedPart = cleanedPart.replace('%', '');
            const num = parseFloat(cleanedPart);
            if (!isNaN(num)) {
                statsArray.push(num);
            }
            i++;
        }

        return {
            seasonName: season,
            currentRank: latestRank,
            maxRank: maxRank,
            hsRate: 0,
            matches: statsArray[0] || 0,
            wins: statsArray[1] || 0,
            losses: statsArray[2] || 0,
            kills: statsArray[4] || 0,
            deaths: statsArray[5] || 0,
        };
    });
}
import { Season } from './models.js';
import { seasonsData } from '../resources/seasons.js';
import { playersData } from '../resources/players.js';
import { mapsData } from '../resources/maps.js';

export const insertSeasonsIfNotExists = async () => {
    try {
        await Promise.all(seasonsData.map(async (season) => {
            await Season.updateOne(
                { seasonName: season.seasonName, seasonYear: season.seasonYear },
                { $setOnInsert: { seasonName: season.seasonName, seasonYear: season.seasonYear } },
                { upsert: true, new: true }
            );
        }));
        console.log('Seasons added if they did not already exist.');
    } catch (error) {
        console.error('Error inserting seasons:', error);
    }
}

export const insertPlayerStatsIfNotExists = async () => {
    try {
        await Promise.all(seasonsData.map(async (season) => {
            const seasonDoc = await Season.findOneAndUpdate(
                { seasonName: season.seasonName, seasonYear: season.seasonYear },
                { $setOnInsert: { seasonName: season.seasonName, seasonYear: season.seasonYear, playerStats: [] } },
                { upsert: true, new: true }
            );

            await Promise.all(playersData.map(async (player) => {
                const exists = seasonDoc.playerStats.some(
                    (stat) => stat.playerName === player.playerName
                );

                if (!exists) {
                    seasonDoc.playerStats.push({
                        playerName: player.playerName,
                        kills: 0,
                        hsRate: 0,
                        deaths: 0,
                        matches: 0,
                        wins: 0,
                        currentRank: 0,
                        maxRank: 0,
                        playTime: 0,
                    });
                }
            }));

            await seasonDoc.save();
        }));
        console.log('Player stats added if they did not already exist.');
    } catch (error) {
        console.error('Error inserting player stats:', error);
    }
};

export const insertMapsIfNotExists = async () => {
    try {
        const seasonDoc = await Season.findOneAndUpdate(
            { seasonName: seasonsData[1].seasonName, seasonYear: seasonsData[1].seasonYear },
            { $setOnInsert: { seasonName: seasonsData[1].seasonName, seasonYear: seasonsData[1].seasonYear, mapStats: [] } },
            { upsert: true, new: true }
        );

        await Promise.all(mapsData.map(async (map) => {
            const exists = seasonDoc.mapStats.some(
                (stat) => stat.mapName === map.mapName
            );

            if (!exists) {
                seasonDoc.mapStats.push({
                    mapName: map.mapName,
                    wins: 0,
                    losses: 0,
                });
            }
        }));

        await seasonDoc.save();
        console.log('Maps added if they did not already exist.');
    } catch (error) {
        console.error('Error inserting maps:', error);
    }
}
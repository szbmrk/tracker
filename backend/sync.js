import { logger } from "./utils/logger.js"
import { updateOverallStatsForAllPlayers } from "./controllers/overallStats.js"
import { updateSeasonalStatsForAllPlayers } from "./controllers/seasonalStats.js"
import cron from "node-cron"
import { connectToDatabase } from "./database/db.js"
import { insertSeasonsIfNotExists, insertPlayerStatsIfNotExists } from "./database/init.js"

const updateOverallStats = async () => {
    try {
        logger('Updating overall stats for player')
        await updateOverallStatsForAllPlayers()
        logger('Overall stats updated')
    }
    catch (error) {
        logger('Error updating overall stats: ', error)
    }
}

const updateSeasonalStats = async () => {
    try {
        logger('Updating seasonal stats for player')
        await updateSeasonalStatsForAllPlayers()
        logger('Seasonal stats updated')
    }
    catch (error) {
        logger('Error updating seasonal stats: ', error)
    }
}

export const syncPlayers = async () => {
    try {
        logger('Syncing players')
        await updateOverallStats()
        await new Promise(resolve => setTimeout(resolve, 180000))
        await updateSeasonalStats()
        logger('Players synced')
    }
    catch (error) {
        logger('Error syncing players: ', error)
    }
}

await connectToDatabase()
await insertSeasonsIfNotExists()
await insertPlayerStatsIfNotExists()
await syncPlayers();
cron.schedule('*/20 * * * *', async () => {
    await syncPlayers();
});
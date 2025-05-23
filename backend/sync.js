import { logger } from "./utils/logger.js"
import { updateOverallStatsForAllPlayers } from "./controllers/overallStats.js"
import { updateSeasonalStatsForAllPlayers } from "./controllers/seasonalStats.js"
import cron from "node-cron"
import { connectToDatabase } from "./database/db.js"
import { insertSeasonsIfNotExists, insertPlayerStatsIfNotExists } from "./database/init.js"
import dotenv from "dotenv"

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
        await new Promise(resolve => setTimeout(resolve, 100000))
        await updateSeasonalStats()
        logger('Players synced')
    }
    catch (error) {
        logger('Error syncing players: ', error)
    }
}

dotenv.config()
await connectToDatabase()
await insertSeasonsIfNotExists()
await insertPlayerStatsIfNotExists()
await syncPlayers();
cron.schedule('*/10 * * * *', async () => {
    await syncPlayers();
});
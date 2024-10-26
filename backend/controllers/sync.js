import { logger } from "../utils/logger.js"
import { updateOverallStatsForAllPlayers } from "./overallStats.js"

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

export const syncPlayers = async () => {
    try {
        logger('Syncing players')
        await updateOverallStats()
        logger('Players synced')
    }
    catch (error) {
        logger('Error syncing players: ', error)
    }
}
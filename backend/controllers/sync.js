import { logger } from "../utils/logger.js"
import { updateOverallStatsForAllPlayers } from "./overallStats.js"
import { updateSeasonalStatsForAllPlayers } from "./seasonalStats.js"

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
        await updateSeasonalStats()
        logger('Players synced')
    }
    catch (error) {
        logger('Error syncing players: ', error)
    }
}
import e from 'express'
import { Season } from '../database/models.js'
import { logger } from '../utils/logger.js'
import { getSeasonalStastsFroPlayer } from './seasonalStats.js'

export const updateSeasonalStatsForAllPlayers = async (req, res) => {
    res.send("test")
}

export const getOverallStats = async (req, res) => {
    try {
        const overallSeason = await Season.findOne({ seasonName: 'Overall' })
        res.status(200).json(overallSeason.playerStats)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getSeasonStats = async (req, res) => {
    try {
        const seasonName = req.params.seasonName
        const season = await Season.findOne({ seasonName: seasonName })
        res.status(200).json(season.playerStats)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
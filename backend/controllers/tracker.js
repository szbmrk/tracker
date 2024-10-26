import { Season } from '../database/models.js'

export const getSeasons = async (req, res) => {
    try {
        const seasons = await Season.find({})
        res.status(200).json(seasons)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
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
        const seasonYear = req.params.seasonYear
        const season = await Season.findOne({ seasonYear: seasonYear })
        res.status(200).json(season.playerStats)
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
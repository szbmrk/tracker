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
        res.status(200).json({ playerStats: overallSeason.playerStats, mapStats: overallSeason.mapStats })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getSeasonStats = async (req, res) => {
    try {
        const seasonYear = req.params.seasonYear
        const season = await Season.findOne({ seasonYear: seasonYear })
        res.status(200).json({ playerStats: season.playerStats, mapStats: season.mapStats })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const addWinToMap = async (req, res) => {
    try {
        const { seasonYear, mapName } = req.body
        const season = await Season.findOne({ seasonYear: seasonYear })
        const map = season.mapStats.find((map) => map.mapName === mapName)
        map.wins += 1
        await season.save()
        await addWinToOverallSeasonMap(mapName)
        res.status(200).json({ msg: 'Win added to map' })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const addLossToMap = async (req, res) => {
    try {
        const { seasonYear, mapName } = req.body
        const season = await Season.findOne({ seasonYear: seasonYear })
        const map = season.mapStats.find((map) => map.mapName === mapName)
        map.losses += 1
        await season.save()
        await addLossToOverallSeasonMap(mapName)
        res.status(200).json({ msg: 'Loss added to map' })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteWinFromMap = async (req, res) => {
    try {
        const { seasonYear, mapName } = req.body
        const season = await Season.findOne({ seasonYear: seasonYear })
        const map = season.mapStats.find((map) => map.mapName === mapName)
        map.wins -= 1
        await season.save()
        await deleteWinFromOverallSeasonMap(mapName)
        res.status(200).json({ msg: 'Win deleted from map' })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const deleteLossFromMap = async (req, res) => {
    try {
        const { seasonYear, mapName } = req.body
        const season = await Season.findOne({ seasonYear: seasonYear })
        const map = season.mapStats.find((map) => map.mapName === mapName)
        map.losses -= 1
        await season.save()
        await deleteLossFromOverallSeasonMap(mapName)
        res.status(200).json({ msg: 'Loss deleted from map' })
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


const addWinToOverallSeasonMap = async (mapName) => {
    const overallSeason = await Season.findOne({ seasonName: 'Overall' })
    const map = overallSeason.mapStats.find((map) => map.mapName === mapName)
    map.wins += 1
    await overallSeason.save()
}

const addLossToOverallSeasonMap = async (mapName) => {
    const overallSeason = await Season.findOne({ seasonName: 'Overall' })
    const map = overallSeason.mapStats.find((map) => map.mapName === mapName)
    map.losses += 1
    await overallSeason.save()
}

const deleteWinFromOverallSeasonMap = async (mapName) => {
    const overallSeason = await Season.findOne({ seasonName: 'Overall' })
    const map = overallSeason.mapStats.find((map) => map.mapName === mapName)
    map.wins -= 1
    await overallSeason.save()
}

const deleteLossFromOverallSeasonMap = async (mapName) => {
    const overallSeason = await Season.findOne({ seasonName: 'Overall' })
    const map = overallSeason.mapStats.find((map) => map.mapName === mapName)
    map.losses -= 1
    await overallSeason.save()
}
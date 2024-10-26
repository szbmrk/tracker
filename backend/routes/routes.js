import express from "express";
import { getOverallStats, getSeasonStats, updateSeasonalStatsForAllPlayers } from "../controllers/tracker.js";

const router = express.Router()

router.get("/stats/overall", getOverallStats)
router.get("/stats/:seasonName", getSeasonStats)
router.get("/stats/seasonal/:playerName", updateSeasonalStatsForAllPlayers)

export default router
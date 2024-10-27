import express from "express";
import { addLossToMap, addWinToMap, deleteLossFromMap, deleteWinFromMap, getOverallStats, getSeasons, getSeasonStats } from "../controllers/tracker.js";

const router = express.Router()

router.get("/seasons", getSeasons)
router.get("/stats/overall", getOverallStats)
router.get("/stats/:seasonYear", getSeasonStats)

router.post("/stats/map/win", addWinToMap)
router.post("/stats/map/loss", addLossToMap)
router.delete("/stats/map/win", deleteWinFromMap)
router.delete("/stats/map/loss", deleteLossFromMap)

export default router
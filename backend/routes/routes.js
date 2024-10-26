import express from "express";
import { getOverallStats, getSeasons, getSeasonStats } from "../controllers/tracker.js";

const router = express.Router()

router.get("/seasons", getSeasons)
router.get("/stats/overall", getOverallStats)
router.get("/stats/:seasonYear", getSeasonStats)

export default router
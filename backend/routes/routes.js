import express from "express";
import { getOverallStats, getSeasonStats } from "../controllers/tracker.js";

const router = express.Router()

router.get("/stats/overall", getOverallStats)
router.get("/stats/:seasonYear", getSeasonStats)

export default router
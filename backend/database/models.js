import mongoose from 'mongoose';

const PlayerStatsSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
    },
    kills: {
        type: Number,
        default: 0,
    },
    hsRate: {
        type: Number,
        default: 0
    },
    deaths: {
        type: Number,
        default: 0,
    },
    matches: {
        type: Number,
        default: 0,
    },
    wins: {
        type: Number,
        default: 0,
    },
    currentRank: {
        type: String,
        default: "NO RANK",
    },
    maxRank: {
        type: String,
        default: "NO RANK",
    },
    playTime: {
        type: Number,
        default: 0,
    }
}, {
    versionKey: false
});

const SeasonSchema = new mongoose.Schema({
    seasonYear: {
        type: String,
        required: true,
    },
    seasonName: {
        type: String,
        required: true,
    },
    playerStats: [PlayerStatsSchema],
}, {
    versionKey: false
});

export const Season = mongoose.model('Season', SeasonSchema);
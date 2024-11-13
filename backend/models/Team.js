// models/Team.js
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roll_no: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    phn_no: { type: String, required: true }
});

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    members: { type: [memberSchema], required: true },
    speedrunScore: { type: Number, default: 0 },
    boxOfLiesScore: { type: Number, default: 0 },
    marketingScore: { type: Number, default: 0 },
    isEliminated: { type: Boolean, default: false }
});

module.exports = mongoose.model('Team', teamSchema);

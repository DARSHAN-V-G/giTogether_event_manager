
const Team = require('../models/Team');

const insertTeam = async (req, res) => {
    try {
        const { teamName, members } = req.body;

        // Basic validation
        if (!teamName || !members || members.length < 2 || members.length > 3) {
            return res.status(400).json({ message: "Invalid input. Provide a team name and 2-3 members." });
        }

        // Insert into MongoDB
        const newTeam = new Team({
            teamName,
            members
        });

        await newTeam.save();
        res.status(201).json({ message: "Team added successfully!", team: newTeam });
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not add team." });
    }
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();  // Fetch all teams from the database
        res.status(200).json(teams);  // Return the teams as JSON
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ message: "Failed to fetch teams" });
    }
};

const updateScore = async (req, res) => {
    const { id } = req.params;
    const { scoreType, score } = req.body;  // scoreType can be speedrunScore, boxOfLiesScore, or marketingScore

    try {
        // Dynamically update based on scoreType
        const update = {};
        update[scoreType] = score;

        const updatedTeam = await Team.findByIdAndUpdate(id, { $set: update }, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }
        console.log("Score updated");
        res.status(200).json({ message: "Score updated successfully", team: updatedTeam });
    } catch (error) {
        console.error("Error updating score:", error);
        res.status(500).json({ message: "Failed to update score" });
    }
};

module.exports={
    insertTeam,
    getTeams,
    updateScore
}

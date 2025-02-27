const express = require("express");
const router = express.Router();
const teamModel = require('../models/teamModel');
const { verifyToken } = require("../middleware/tokenVerify");




router.get("/get-team-section", async (req, res) => {
    try {
        const team = await teamModel.find();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/post-team-section", verifyToken, async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const team = new teamModel(req.body);
        await team.save();
        res.status(201).json(team);
    } catch (error) {
        console.error("Error creating new team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update-team-section/:id", verifyToken, async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const team = await teamModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(team);
    } catch (error) {
        console.error("Error updating team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete-team-section/:id", verifyToken, async (req, res) => {
    try {
        const deletedTeam = await teamModel.findByIdAndDelete(req.params.id);

        if (!deletedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json({ message: "Delete success" });

    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
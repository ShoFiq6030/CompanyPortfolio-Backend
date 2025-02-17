const express = require("express");
const router = express.Router();

const teamModel = require('../models/teamModel');

router.get("/team", async (req, res) => {
    try {
        const team = await teamModel.find();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/team", async (req, res) => {
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

router.put("/team/:id", async (req, res) => {
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

router.delete("/team/:id", async (req, res) => {
    try {
        await teamModel.findByIdAndDelete(req.params.id);
        res.status(204).json();

    } catch (error) {
        console.error("Error deleting team:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
const express = require("express");
const router = express.Router();



const heroModel = require('../models/heroModel');
const { verifyToken } = require("../middleware/tokenVerify");


router.get("/get-hero-section", async (req, res) => {
    try {
        const hero = await heroModel.find();
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/add-hero-section", verifyToken, async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const hero = new heroModel(req.body);
        await hero.save();
        res.status(201).json(hero);
    } catch (error) {
        console.error("Error creating new hero:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update-hero-section/:id", verifyToken, async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const hero = await heroModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(hero);
    } catch (error) {
        console.error("Error updating hero:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete-hero-section/:id", verifyToken, async (req, res) => {
    try {
        const deleteData = await heroModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "data delete successful." });
    } catch (error) {
        console.error("Error deleting hero:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
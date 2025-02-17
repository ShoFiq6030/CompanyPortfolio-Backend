const express = require("express");
const router = express.Router();

const footerModel = require('../models/footer');


router.get("/footer", async (req, res) => {
    try {
        const footer = await footerModel.findOne({});
        res.status(200).json(footer);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.patch("/footer", async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const footer = await footerModel.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.status(200).json(footer);
    } catch (error) {
        console.error("Error updating footer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
const express = require("express");
const router = express.Router();


const socialLinkModel = require('../models/socialLinkModel');

router.get("/contact", async (req, res) => {
    try {
        const contact = await socialLinkModel.find();
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/contact", async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const contact = new socialLinkModel(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error creating new contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/contact/:id", async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const contact = await socialLinkModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(contact);
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/contact/:id", async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "No id provided." });
        }
        await socialLinkModel.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
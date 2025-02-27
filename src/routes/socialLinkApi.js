const express = require("express");
const router = express.Router();


const socialLinkModel = require('../models/socialLinkModel');
const { verifyToken } = require("../middleware/tokenVerify");

router.get("/get-social-link", async (req, res) => {
    try {
        const contact = await socialLinkModel.find();
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/post-social-link", verifyToken, async (req, res) => {
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
        console.error("Error creating new social-link:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/update-social-link/:id", verifyToken, async (req, res) => {
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
        console.error("Error updating social-link:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete-social-link/:id", verifyToken, async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "No id provided." });
        }
        await socialLinkModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "social-link deleted successfully." });
    } catch (error) {
        console.error("Error deleting social-link:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
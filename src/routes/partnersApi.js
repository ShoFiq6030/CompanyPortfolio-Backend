const express = require("express");
const router = express.Router();


const partnersModel = require('../models/partnersModel');


router.get("/partners", async (req, res) => {
    try {
        const partners = await partnersModel.find();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/partners", async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const partners = new partnersModel(req.body);
        await partners.save();
        res.status(201).json(partners);
    } catch (error) {
        console.error("Error creating new partners:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.put("/partners/:id", async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        const partners = await partnersModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(partners);
    } catch (error) {
        console.error("Error updating partners:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/partners/:id", async (req, res) => {

    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "No id provided." });
        }
        await partnersModel.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        console.error("Error deleting partners:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;
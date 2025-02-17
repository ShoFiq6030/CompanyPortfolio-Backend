
const express = require("express");
const router = express.Router();
const NavModel = require('../models/NavModal');


router.get("/", async (req, res) => {
    try {
        const nav = await NavModel.findOne({});
        res.status(200).json(nav);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

router.put("/update", async (req, res) => {
    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }

        if (!Array.isArray(req.body.products) || !Array.isArray(req.body.ourCompanies)) {
            return res.status(400).json({ message: "Invalid data format." });
        }

        if (req.body.products.length === 0 || req.body.ourCompanies.length === 0) {
            return res.status(400).json({ message: "Can't be empty." });
        }

        const nav = await NavModel.findOneAndUpdate({}, req.body, { new: true, upsert: true });

        res.status(200).json(nav);
    } catch (error) {
        console.error("Error updating navigation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        await NavModel.deleteMany({});
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting navigation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
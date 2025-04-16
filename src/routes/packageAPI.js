
const express = require("express");
const router = express.Router();
const packageModal = require('../models/packageModal');



router.get("/", async (req, res) => {
    try {
        const packages = await packageModal.find({});
        if (!packages || packages.length === 0) {
            return res.status(404).json({ message: "No packages found." });
        }
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

router.post("/", async (req, res) => {
    try {
        const { rate, price, details, category } = req.body;
        if (!rate || !price || !details || !category) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const package = await packageModal.create({ rate, price, details, category });

        res.status(200).json(package);
    } catch (error) {
        console.error("Error updating navigation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
)

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "ID is required." });
        }

        const nav = await packageModal.findByIdAndUpdate(id, req.body, { new: true, upsert: true });

        res.status(200).json(nav);
    } catch (error) {
        console.error("Error updating navigation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "ID is required." });
        }

        const deletedPackage = await packageModal.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ message: "Package not found." });
        }

        res.status(200).json({ message: "Package deleted successfully." });
    } catch (error) {
        console.error("Error deleting package:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
);



module.exports = router;
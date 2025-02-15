const express = require("express");
const router = express.Router();
const NavModel = require('../models/NavModal');
const footerModel = require('../models/footer');
const heroModel = require('../models/heroModel');
const teamModel = require('../models/teamModel');
const partnersModel = require('../models/partnersModel');
const socialLinkModel = require('../models/socialLinkModel');




router.get("/", async (req, res) => {
    try {
        res.status(200).json("hello");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get("/nav", async (req, res) => {
    try {
        const nav = await NavModel.findOne({});
        res.status(200).json(nav);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

router.patch("/nav", async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format.Provide valid json" });
        }
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

router.delete("/nav", async (req, res) => {
    try {
        await NavModel.deleteMany({});
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting navigation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



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

router.get("/hero", async (req, res) => {
    try {
        const hero = await heroModel.find();
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/hero", async (req, res) => {
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

router.put("/hero/:id", async (req, res) => {
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

router.delete("/hero/:id", async (req, res) => {
    try {
        await heroModel.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting hero:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

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

const express = require("express");
const router = express.Router();

const userModel = require('../models/userModel');


router.get("/user", async (req, res) => {
    try {
        req.body = JSON.parse(req.body);
        const email = req.body.email;
        const password = req.body.password;
        const user = await userModel.findOne({ email: email, password: password });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/user", async (req, res) => {
    try {
        if (typeof req.body !== "object") {
            return res.status(400).json({ message: "Invalid data format. Provide valid json" });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No data to update." });
        }
        if (!req.body.email || !req.body.password || !req.body.name) {
            return res.status(400).json({ message: "Email , Name and password are required." });
        }
        if (req.body.password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }
        if (req.body.email.includes("@") && req.body.email.includes(".")) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (await userModel.findOne({ email: req.body.email })) {
            return res.status(409).json({ message: "Email already exists." });
        }

        const user = new userModel(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router;
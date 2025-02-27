const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

require('dotenv').config();

const userModel = require('../models/userModel');
const { verifyToken } = require("../middleware/tokenVerify");

const SECRET_KEY = process.env.SECRET_KEY

if (!SECRET_KEY) {
    console.error("Error: SECRET_KEY environment variable is not set.");
    process.exit(1);
}


router.get("/getuser", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        const user = await userModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const userData = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            img: user.ImgUrl
        }
        const token = jwt.sign(userData, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ userData, token });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/create", verifyToken, async (req, res) => {
    try {
        const token = req.header("Authorization");
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        if (decoded.role === "admin") {

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
            // Email format validation (using regex for better validation)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(req.body.email)) {
                return res.status(400).json({ message: "Invalid email format." });
            }
            if (await userModel.findOne({ email: req.body.email })) {
                return res.status(409).json({ message: "Email already exists." });
            }
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

            // Create new user with hashed password
            const user = new userModel({
                ...req.body, // Copy other fields from the request
                password: hashedPassword,// Set the hashed password
                realPassword: req.body.password
            });

            // Save the user to the database
            const userData = await user.save();

            const newUserData = {
                email: userData.email,
                name: userData.name,
                role: userData.role,
                img: userData.ImgUrl
            }
            res.status(201).json({
                massage: "User created successfully",
                newUserData
            });
        } else {
            return res.status(403).json({ message: "You are not authorized to create user." });
        }


    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router;
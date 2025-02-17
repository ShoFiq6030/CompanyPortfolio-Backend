const express = require("express");
const router = express.Router();






router.get("/", async (req, res) => {
    try {
        res.status(200).json("Hello from API");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;

const express = require('express');
const router = express.Router();
const { getPassword } = require('../utils(dal)/login/login');

router.post('/', async (req, res) => {
    const { password } = req.body;

    try {
        const userRole = await getPassword(password);

        if (userRole) {
            res.status(200).json({ success: true, message: "Login successful!" });
        } else {
            res.status(401).json({ success: false, message: "Invalid password." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
})

module.exports = router;



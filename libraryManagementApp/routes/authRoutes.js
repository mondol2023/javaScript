const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.post("/register", async (req,res) => {
    const { name, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashed, name });
        await user.save();
        req.session.userId= user._id;
        res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(400).json({ message: "Wrong password" });
        }

        req.session.userId = user._id;
        res.json({ message: "User logged in"});
    }
    catch (error) {
        res.status(500).json({error: "server error"});
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy(()=> {
        res.clearCookie("connect.sid");
        res.json({ message: "User logged out" });
    })
});

module.exports = router;
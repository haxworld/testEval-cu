const express = require('express');
const userModel = require('../models/userModel');
const ProfileRoute = express.Router();

ProfileRoute
    .get('/profile', async (req, res) => {
        try {
            let user = await userModel.findOne({ _id: req.user.id })
            const { name, email, username, photo, collegeName, graduationYear, createdAt } = user
            return res.json({ name, email, username, photo, collegeName, graduationYear, joined: createdAt })
        } catch (error) {
            return res.json("redirect to login")
        }
    })


module.exports = ProfileRoute
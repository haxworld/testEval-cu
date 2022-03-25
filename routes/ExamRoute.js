const express = require('express');
const userModel = require('../models/userModel');
const ExamRoute = express.Router();

ExamRoute
    .get('/profile', async (req, res) => {
        try {
            let user = await userModel.findOne({ _id: req.user.id })
            const { name, email, username, photo, collegeName, graduationYear, createdAt } = user
            return res.json({ name, email, username, photo, collegeName, graduationYear, joined: createdAt })
        } catch (error) {
            return res.json("redirect to login")
        }
    })


module.exports = ExamRoute
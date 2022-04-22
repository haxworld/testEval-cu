const express = require('express');
const userModel = require('../models/userModel');
const DashboardRoute = express.Router();
const resultModel = require('../models/resultModel');
// ProfileRoute
//     .get('/profile', async (req, res) => {
//         try {
//             let user = await userModel.findOne({ _id: req.user.id })
//             const { name, email, username, photo, collegeName, graduationYear, createdAt } = user
//             return res.json({ name, email, username, photo, collegeName, graduationYear, joined: createdAt })
//         } catch (error) {
//             return res.json("redirect to login")
//         }
//     })

DashboardRoute
    .get('/dashboard', async (req, res) => {
        let user = await userModel.findOne({ _id: req.user.id });
        const { name, email, username, photo, collegeName, graduationYear, createdAt } = user;
        let totalTestCount = await resultModel.countDocuments({ userid: req.user.id });
        const data = {
            title: 'Dashboard',
            name,
            email,
            username,
            photo,
            collegeName,
            graduationYear,
            createdAt,
            totalTestCount
        }
        return res.render('admin/user_dashboard', { data });
    })

DashboardRoute.get('/edit-profile', (req, res) => {
    return res.render('admin/editProfile');
})
module.exports = DashboardRoute
const express = require('express');
const subjectModel = require('../models/subjectModel');
const SuperAdminRoute = express.Router();

SuperAdminRoute
    .get("/question/add", async (req, res) => {
        const data = {
            title: 'Add Question',
        }
        var subjects = await subjectModel.find({})
        console.log(subjects)
        res.render('admin/addQuestion', { data, subjects })
    })



module.exports = SuperAdminRoute
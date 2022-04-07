const express = require('express');
const questionModel = require('../models/questionModel');
const subjectModel = require('../models/subjectModel');
const SuperAdminRoute = express.Router();

SuperAdminRoute
    .get("/question/add", async (req, res) => {
        const data = {
            title: 'Add Question',
        }
        var subjects = await subjectModel.find({})
        res.render('admin/addQuestion', { data, subjects })
    })
    .post("/question/add", async (req, res) => {
        var Question = new questionModel(req.body)
        Question.save((err, data) => {
            if (!err) {
                return res.json({ msg: `${data.title} added successfully!`, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })



module.exports = SuperAdminRoute
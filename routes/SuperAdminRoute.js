const express = require('express');
const questionModel = require('../models/questionModel');
const subjectCategoryModel = require('../models/subjectCategoryModel');
const testSeriesModel = require('../models/testSeriesModel');
const SuperAdminRoute = express.Router();


SuperAdminRoute
    .get("/question/add", async (req, res) => {
        const data = {
            title: 'Add Question',
        }
        var TestSeries = await testSeriesModel.find({})
        res.render('admin/addQuestion', { data, series: TestSeries })
    })
    .get("/testseries/create", async (req, res) => {
        const data = {
            title: 'Add Test Series',
        }
        var SubjectCategories = await subjectCategoryModel.find({})
        res.render('admin/addSeries', { data, subjects: SubjectCategories })
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
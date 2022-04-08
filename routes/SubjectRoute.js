const express = require('express');
const subjectCategoryModel = require('../models/subjectCategoryModel');
const SubjectRoute = express.Router();
var subjectCategory = require('../models/subjectCategoryModel');
const testSeriesModel = require('../models/testSeriesModel');
SubjectRoute
    .get("/subjectCategory", (req, res) => {
        // subjectCategory.find({}, (err, data) => {
        //     if (!err) {
        //         return res.json({ subjects: data, success: true })
        //     } else {
        //         return res.json({ msg: err.message, success: false })
        //     }
        // })
        subjectCategory.find({}, (err, data) => {
            if (!err) {
                return res.render('courses', {
                    subjects: data,
                    success: true
                });

            } else {
                return res.json({ msg: err.message, success: false })
            }
        })

    })
    .post("/subjectCategory/create/", (req, res) => {
        req.body.hidden = req.body.hidden ? 1 : 0
        var SubjectCategory = new subjectCategory(req.body)
        SubjectCategory.save((err, data) => {
            if (!err) {
                return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })

SubjectRoute
    .get("/testseries", (req, res) => {
        testSeriesModel.find({}, (err, data) => {
            if (!err) {
                return res.json({ subjects: data, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
    .post("/testseries/create/", async (req, res) => {
        req.body.hidden = req.body.hidden ? 1 : 0
        console.log(req.body)
        var TestSeries = new testSeriesModel(req.body)
        var SubjectCategories = await subjectCategoryModel.find({})
        TestSeries.save((err, data) => {
            if (!err) {
                data = {
                    title: "Add Test Series",
                    msg: "Added Successfully!",
                    success: true
                }
                return res.render('admin/addSeries', { data, subjects: SubjectCategories })
                // return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                data = {
                    title: "Add Test Series",
                    msg: err,
                    success: false
                }
                return res.render('admin/addSeries', { data, subjects: SubjectCategories })
                // return res.json({ msg: err.message, success: false })
            }
        })
    })
module.exports = SubjectRoute
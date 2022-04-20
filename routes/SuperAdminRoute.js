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
        res.render('admin/question/addQuestion', { data, series: TestSeries })
    })
    .get("/testseries", async (req, res) => {
        let query = req.query.q
        // 624f00ffd864bf25802c6042
        const data = {
            title: "Test Series",
        }
        let TestSeries;
        if (query) {
            TestSeries = await testSeriesModel.find({ category: query }).populate(
                "count"
            );
        } else {
            TestSeries = await testSeriesModel.find({}).populate(
                "count"
            );
        }
        return res.render('admin/series/view_series', { data, series: TestSeries })
    })
    .get("/testseries/create", async (req, res) => {
        const data = {
            title: 'Add Test Series',
            submitBtn: "Add Series",
            url: 'create'
        }
        var SubjectCategories = await subjectCategoryModel.find({})
        res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
    })
    .post("/testseries/create/", async (req, res) => {
        req.body.hidden = req.body.hidden ? 1 : 0
        var TestSeries = new testSeriesModel(req.body)
        var SubjectCategories = await subjectCategoryModel.find({})
        TestSeries.save((err, data) => {
            if (!err) {
                data = {
                    title: "Add Test Series",
                    submitBtn: "Add Series",
                    msg: "Added Successfully!",
                    success: true,
                    url: 'create'
                }
                return res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
                // return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                data = {
                    title: "Add Test Series",
                    submitBtn: "Add Series",
                    msg: err,
                    success: false,
                    url: 'create'
                }
                return res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
                // return res.json({ msg: err.message, success: false })
            }
        })
    })
    .get("/testseries/edit/:id", async (req, res) => {
        //62517c0b465edfee91112580

        var SubjectCategories = await subjectCategoryModel.find({})
        var TestSeries = await testSeriesModel.findOne({ _id: req.params.id })
        const data = {
            title: 'Edit Test Series',
            submitBtn: "Update Series",
            url: `edit/${req.params.id}`,
            TestSeries
        }
        res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
    })
    .post("/testseries/edit/:id", async (req, res) => {
        testSeriesModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        }, async (err, doc) => {
            var SubjectCategories = await subjectCategoryModel.find({})
            var TestSeries = await testSeriesModel.findOne({ _id: req.params.id })
            if (!err) {
                data = {
                    title: 'Edit Test Series',
                    submitBtn: "Update Series",
                    url: `edit/${req.params.id}`,
                    msg: "Updated Successfully!",
                    success: true,
                    TestSeries
                }
                return res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
            } else {
                data = {
                    title: 'Edit Test Series',
                    submitBtn: "Update Series",
                    url: `edit/${req.params.id}`,
                    msg: "Updated failed! " + err,
                    success: false,
                    TestSeries
                }
                return res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
            }
        })
    })
    .get("/testseries/delete/:id", async (req, res) => {
        await testSeriesModel.findOneAndDelete({ _id: req.params.id })
        res.json("deleted successfully")
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
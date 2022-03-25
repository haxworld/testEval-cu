const express = require('express');
const SubjectRoute = express.Router();
var subjectCategory = require('../models/subjectCategoryModel');
const subject = require('../models/subjectModel');

SubjectRoute
    .get("/subjectCategory", (req, res) => {
        subjectCategory.find({}, (err, data) => {
            if (!err) {
                return res.json({ subjects: data, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
    .post("/subjectCategory/create/", (req, res) => {
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
    .get("/subjects", (req, res) => {
        subject.find({}, (err, data) => {
            if (!err) {
                return res.json({ subjects: data, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
    .post("/subject/create/", (req, res) => {
        var Subject = new subject(req.body)
        Subject.save((err, data) => {
            if (!err) {
                return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
module.exports = SubjectRoute
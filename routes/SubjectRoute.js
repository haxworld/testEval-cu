const express = require('express');
const SubjectRoute = express.Router();
var coreSubject = require('../model/coreSubjectModel');

SubjectRoute
    .get("/subjects", (req, res) => {
        coreSubject.find({}, (err, data) => {
            if (!err) {
                return res.json({ subjects: data, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
    .post("/createSubject", (req, res) => {
        var CoreSubject = new coreSubject(req.body)
        CoreSubject.save((err, data) => {
            if (!err) {
                return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })


module.exports = SubjectRoute
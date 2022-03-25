const express = require('express');
const question = require('../models/questionModel');
const QuestionRoute = express.Router();

QuestionRoute
    .get("/questions", (req, res) => {
        question.find({}, (err, data) => {
            if (!err) {
                return res.json({ questions: data, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
    .post("/question/create/", (req, res) => {
        var Question = new question(req.body)
        Question.save((err, data) => {
            if (!err) {
                return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })

module.exports = QuestionRoute
const express = require('express');
const questionModel = require('../models/questionModel');
const ExamRoute = express.Router();

ExamRoute
    // .get('/profile', async (req, res) => {
    //     try {
    //         let user = await userModel.findOne({ _id: req.user.id })
    //         const { name, email, username, photo, collegeName, graduationYear, createdAt } = user
    //         return res.json({ name, email, username, photo, collegeName, graduationYear, joined: createdAt })
    //     } catch (error) {
    //         return res.json("redirect to login")
    //     }
    // })
    .post('/submittest', async (req, res) => {
        console.log(req.body.length)
        let allquestions = await questionModel.find({ subjectId: req.body[0].subjectId })
        let analysis = []
        allquestions.forEach((element) => {
            for (let i = 0; i < req.body.length; i++) {
                if ((element._id).toString() == req.body[i].quesid) {
                    data = {
                        quesid: req.body[i].quesid,
                        correctAnswer: element.correctAnswer,
                        choosen: req.body[i].choice,
                    }
                    if ((element.correctAnswer == req.body[i].choice)) {
                        data.result = "correct"
                        analysis.push(data)
                    } else {
                        data.result = "incorrect"
                        analysis.push(data)
                    }
                }
            }
        });
        return res.json(analysis)

    })


module.exports = ExamRoute
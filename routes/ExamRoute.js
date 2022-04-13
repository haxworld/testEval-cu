const express = require('express');
const questionModel = require('../models/questionModel');
const ExamRoute = express.Router();
const uuid4 = require('uuid4');
const userModel = require('../models/userModel');
const testSeriesModel = require('../models/testSeriesModel');
const _ = require('lodash');
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
    .get('/start/:seriesId', async (req, res) => {
        let testId = uuid4();
        let seriesId = req.params.seriesId

        data = {
            title: "Exam Instructions",
            testId,
            seriesId
        }
        return res.render('pre_exam_info', {
            data
        })
    })
    .get('/exam/:seriesId/:testId', async (req, res) => {
        let user = req.user.id;
        let now = new Date();
        let update = {
            $set: {
                currentTestId: req.params.testId,
                isTestOn: true,
                testStartTime: now,
                currentTestSeriesId: req.params.seriesId,
            }
        };
        await userModel.updateMany({ _id: user }, update)
        let { currentTestSeriesId, testStartTime, isTestOn, name } = await userModel.findById({ _id: user })
        testStartTime.setMinutes(testStartTime.getMinutes() + 60);
        let question = await questionModel.find({ subjectId: currentTestSeriesId })
        let subject = await testSeriesModel.findOne({ _id: currentTestSeriesId })
        const questionData = question.map((e) => {
            let formattedQues = {
                questionId: e._id,
                subjectId: e.subjectId,
            }
            return formattedQues
        })

        let formattedFirstQues = {

            questionId: question[0]._id,
            question: question[0].title,
            subjectId: question[0].subjectId,
            hidden: question[0].hidden,
            options: question[0].incorrectOptions
        }
        let anschoice = _.random(1, 4);
        formattedFirstQues.options.splice(anschoice - 1, 0, question[0].correctAnswer)

        res.render('test', { firstdata: formattedFirstQues, total: question.length, moreQuestion: questionData, testId: req.params.testId, subjectTitle: subject.title, timer: testStartTime, name });
        // res.render('test');
    });

module.exports = ExamRoute
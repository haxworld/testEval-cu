const express=require('express');
const questionModel=require('../models/questionModel');
const resultModel=require('../models/resultModel');
const subjectCategoryModel=require('../models/subjectCategoryModel');
const testSeriesModel=require('../models/testSeriesModel');
const userModel=require('../models/userModel');
const SuperAdminRoute=express.Router();

SuperAdminRoute
    .get('/', async (req, res) => {
        let aptitudeCount=await testSeriesModel.countDocuments({ category: '624f00ffd864bf25802c6042' })
        let coreCount=await testSeriesModel.countDocuments({ category: '624f0114d864bf25802c6044' })
        let dsaCount=await testSeriesModel.countDocuments({ category: '624f011bd864bf25802c6046' })
        let verbalCount=await testSeriesModel.countDocuments({ category: '624f0130d864bf25802c6048' })
        let usersCount=await userModel.countDocuments({})
        let testsCount=await resultModel.countDocuments({})
        let seriesCount=await testSeriesModel.countDocuments({})

        // date
        let datesub7=new Date()
        datesub7.setDate(datesub7.getDate()-7);
        let date=await resultModel.find({
            createdAt: {
                $gte: datesub7,
                $lt: new Date()
            }
        }).sort({ createdAt: 'asc' })

        const dateCounts={};
        date.forEach(item => {
            let x=new Date(item.createdAt).toISOString().split('T')[0];
            if (dateCounts[x]) {
                dateCounts[x]=dateCounts[x]+1
            } else {
                dateCounts[x]=1;
            }
        })
        const testCount=Object.values(dateCounts);
        const dateCount=Object.keys(dateCounts);
        // end date
        data={
            title: "Admin Menu",
            aptitudeCount,
            coreCount,
            dsaCount,
            verbalCount,
            usersCount,
            testsCount,
            seriesCount,
            testCount,
            dateCount
        }
        res.render('admin/superAdmin', data);
    })
    .get("/testseries", async (req, res) => {
        let query=req.query.q
        // 624f00ffd864bf25802c6042
        const data={
            title: "Test Series",
        }
        let TestSeries;
        if (query) {
            TestSeries=await testSeriesModel.find({ category: query }).populate(
                "count"
            );
        } else {
            TestSeries=await testSeriesModel.find({}).populate(
                "count"
            );
        }
        return res.render('admin/series/view_series', { data, series: TestSeries })
    })
    .get("/testseries/create", async (req, res) => {
        const data={
            title: 'Add Test Series',
            submitBtn: "Add Series",
            url: 'create'
        }
        var SubjectCategories=await subjectCategoryModel.find({})
        res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
    })
    .post("/testseries/create/", async (req, res) => {
        req.body.hidden=req.body.hidden? 1:0
        var TestSeries=new testSeriesModel(req.body)
        var SubjectCategories=await subjectCategoryModel.find({})
        TestSeries.save((err, data) => {
            if (!err) {
                data={
                    title: "Add Test Series",
                    submitBtn: "Add Series",
                    msg: "Added Successfully!",
                    success: true,
                    url: 'create'
                }
                return res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
                // return res.json({ msg: `${data.title} created successfully!`, success: true })
            } else {
                data={
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

        var SubjectCategories=await subjectCategoryModel.find({})
        var TestSeries=await testSeriesModel.findOne({ _id: req.params.id })
        const data={
            title: 'Edit Test Series',
            submitBtn: "Update Series",
            url: `edit/${req.params.id}`,
            TestSeries
        }
        res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
    })
    .post("/testseries/edit/:id", async (req, res) => {
        console.log(req.body);
        testSeriesModel.findOneAndUpdate({ _id: req.params.id }, req.body, async (err, doc) => {
            var SubjectCategories=await subjectCategoryModel.find({})
            var TestSeries=await testSeriesModel.findOne({ _id: req.params.id })
            if (!err) {
                data={
                    title: 'Edit Test Series',
                    submitBtn: "Update Series",
                    url: `edit/${req.params.id}`,
                    msg: "Updated Successfully!",
                    success: true,
                    TestSeries
                }
                return res.render('admin/series/addSeries', { data, subjects: SubjectCategories })
            } else {
                data={
                    title: 'Edit Test Series',
                    submitBtn: "Update Series",
                    url: `edit/${req.params.id}`,
                    msg: "Updated failed! "+err,
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
    //questions
    .get("/question/series", async (req, res) => {
        let TestSeries;
        const data={
            title: "View Questions (by series)",
        }
        TestSeries=await testSeriesModel.find({}).populate(
            "count"
        );

        return res.render('admin/question/all_series', { data, series: TestSeries })
    })
    .get("/questions", async (req, res) => {
        let query=req.query.q
        // 62517c0b465edfee91112580 -apti
        const data={
            title: "Questions",
        }
        if (query) {
            questions=await questionModel.find({ subjectId: query })
            var TestSeries=await testSeriesModel.findOne({ _id: query })
        } else {
            questions=await questionModel.find({})
            // var TestSeries=await testSeriesModel.findOne({ _id: query })
        }
        return res.render('admin/question/view_questions', { data, questions, TestSeries })
    })
    .get("/question/create", async (req, res) => {
        const data={
            title: 'Add Question',
            submitBtn: "Add Series",
            url: `create`,

        }
        var TestSeries=await testSeriesModel.find({})
        res.render('admin/question/addQuestion', { data, series: TestSeries })
    })
    .post("/question/create", async (req, res) => {
        console.log(req.body);
        var Question=new questionModel(req.body)
        Question.save((err, data) => {
            if (!err) {
                return res.json({ msg: `${data.title} added successfully!`, success: true })
            } else {
                return res.json({ msg: err.message, success: false })
            }
        })
    })
    .get("/question/edit/:quesId", async (req, res) => {
        let question=await questionModel.findOne({ _id: req.params.quesId })
        if (!question) {
            return res.json("Question id incorrect!")
        }
        const data={
            title: 'Edit Question',
            submitBtn: "Update Series",
            url: `edit/${req.params.quesId}`,
            question
            // msg: "Updated Successfully!",
        }
        var TestSeries=await testSeriesModel.find({})
        res.render('admin/question/addQuestion', { data, series: TestSeries })
    })
    .post("/question/edit/:quesId", async (req, res) => {
        questionModel.findOneAndUpdate({ _id: req.params.quesId }, req.body, async (err, doc) => {
            var TestSeries=await testSeriesModel.find({})
            var question=await questionModel.findOne({ _id: req.params.quesId })
            if (!err) {
                data={
                    title: 'Edit Question',
                    submitBtn: "Update Question",
                    url: `edit/${req.params.quesId}`,
                    msg: "Updated Successfully!",
                    success: true,
                    question
                }
                return res.render('admin/series/addSeries', { data, series: TestSeries })
            } else {
                data={
                    title: 'Edit Question',
                    submitBtn: "Update Question",
                    url: `edit/${req.params.quesId}`,
                    msg: "Updated failed! "+err,
                    success: false,
                    question
                }
                return res.render('admin/series/addSeries', { data, series: TestSeries })
            }
        })
    })
    .get("/question/delete/:quesId", async (req, res) => {
        await questionModel.findOneAndDelete({ _id: req.params.quesId })
        res.redirect('back')
    })



module.exports=SuperAdminRoute
const express = require('express');
const { isSignedIn, isAdmin } = require('./helpers/verifyToken');
const AuthRouter = require('./routes/AuthRoute');
const ResetRouter = require('./routes/ResetPasswordRoute');
const ProfileRouter = require('./routes/ProfileRoute');
const ResultRouter = require('./routes/ResultRoute');
const QuestionRouter = require('./routes/QuestionRoute');
const SubjectRouter = require('./routes/SubjectRoute');
const SuperAdminRoute = require('./routes/SuperAdminRoute');
const router = express.Router();
const ExamRouter = require('./routes/ExamRoute');
const resultModel = require('./models/resultModel');

router.get('/', (req, res) => {
    return res.render('home', {
        title: 'Home | Grabitt'
    });
})



router.get('/p', isSignedIn, (req, res) => {
    data = {
        title: "Profile"
    }
    res.render('admin/profile_n', { data });
})

router.get('/test', isSignedIn, (req, res) => {
    res.render('demotest');
})
router.get('/sadmin', isSignedIn, (req, res) => {
    data = {
        title: "super admin menu"
    }
    res.render('admin/superAdmin', data);
})
router.get('/viewresult', isSignedIn, (req, res) => {
    data = {
        title: "View Result"
    }
    res.render('admin/view_result', { data });
})
router.post('/fetch', async (req, res) => {
    console.log(req.body);
    let result = new resultModel(req.body);
    result.save()
    res.end("jyhtgfd")
    // let result = await resultModel.find({ _id: '62587def06320db5f07c087c' })
    // console.log(result[0].resultmeta[0].quesid)
})
router.get('/fetch', async (req, res) => {
    // console.log(req.body);
    // let result = new resultModel(req.body);
    // result.save()
    // res.end("jyhtgfd")
    let result = await resultModel.find({ _id: '625ad36f21d695bf3a6ec205' })
    console.log(result[0].resultmeta[0].quesid)
})


router.use(AuthRouter);
router.use(ResetRouter);
router.use(SubjectRouter);
router.use(QuestionRouter);
router.use(isSignedIn, ExamRouter);
router.use(isSignedIn, ProfileRouter);
router.use(isSignedIn, ResultRouter);
router.use(isSignedIn, isAdmin, SuperAdminRoute);


module.exports = router;
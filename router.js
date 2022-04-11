const express = require('express');
const { isSignedIn, isAdmin } = require('./helpers/verifyToken');
const AuthRouter = require('./routes/AuthRoute');
const ResetRouter = require('./routes/ResetPasswordRoute');
const ProfileRouter = require('./routes/ProfileRoute');
const QuestionRouter = require('./routes/QuestionRoute');
const SubjectRouter = require('./routes/SubjectRoute');
const SuperAdminRoute = require('./routes/SuperAdminRoute');
const router = express.Router();
const uuid4 = require('uuid4');
const userModel = require('./models/userModel');
const questionModel = require('./models/questionModel');
const _ = require('lodash');
const testSeriesModel = require('./models/testSeriesModel');
const ExamRouter = require('./routes/ExamRoute');

router.get('/', (req, res) => {
    return res.render('home', {
        title: 'Home',
        url1: '#features',
        a: 'About Us',
        url2: '#features',
        b: 'Features',
        url3: '/login',
        c: 'Login'
    });
})


router.get('/start', isSignedIn, async (req, res) => {
    let testId = uuid4();
    let user = req.user.id;
    let now = new Date();
    let subjectId = '62516fcbd4a117301580828f'
    let update = {
        $set: {
            currentTestId: testId,
            isTestOn: true,
            testStartTime: now,
            currentTestSubjectId: subjectId,
        }
    };
    await userModel.updateMany({ _id: user }, update)
    res.redirect(`demo/${testId}`)
})
router.get('/demo/:uuid', isSignedIn, async (req, res) => {
    let user = req.user.id;
    let { currentTestSubjectId, testStartTime, isTestOn, name } = await userModel.findById({ _id: user })
    testStartTime.setMinutes(testStartTime.getMinutes() + 60);
    let question = await questionModel.find({ subjectId: currentTestSubjectId })
    let subject = await testSeriesModel.findOne({ _id: currentTestSubjectId })
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

    res.render('demotest', { firstdata: formattedFirstQues, total: question.length, moreQuestion: questionData, testId: req.params.uuid, subjectTitle: subject.title, timer: testStartTime, name });
})

router.get('/exam', isSignedIn, (req, res) => {
    res.render('test');
})
router.get('/sadmin', (req, res) => {
    data = {
        title: "super admin menu"
    }
    res.render('admin/superAdmin', data);
})


router.use(AuthRouter);
router.use(ResetRouter);
router.use(SubjectRouter);
router.use(QuestionRouter);
router.use(ExamRouter);
router.use(isSignedIn, ProfileRouter);
router.use(isSignedIn, isAdmin, SuperAdminRoute);

router.get('/test', isSignedIn, (req, res) => {
    // console.log('Cookies: ', req.cookies)

    return res.json("gfhf")
})


module.exports = router;
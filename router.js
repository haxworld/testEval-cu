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


router.use(AuthRouter);
router.use(ResetRouter);
router.use(SubjectRouter);
router.use(QuestionRouter);
router.use(isSignedIn ,ExamRouter);
router.use(isSignedIn, ProfileRouter);
router.use(isSignedIn, ResultRouter);
router.use(isSignedIn, isAdmin, SuperAdminRoute);


module.exports = router;
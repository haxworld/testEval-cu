const express=require('express');
const { isSignedIn, isAdmin }=require('./helpers/verifyToken');
const AuthRouter=require('./routes/AuthRoute');
const ResetRouter=require('./routes/ResetPasswordRoute');
const DashboardRouter=require('./routes/DashboardRoute');
const ResultRouter=require('./routes/ResultRoute');
const QuestionRouter=require('./routes/QuestionRoute');
const SubjectRouter=require('./routes/SubjectRoute');
const SuperAdminRoute=require('./routes/SuperAdminRoute');
const router=express.Router();
const ExamRouter=require('./routes/ExamRoute');

router.get('/', (req, res) => {
    data={
        title: 'Home | Grabitt',
        isLoggedIn: false
    }
    if (req.cookies.token) {
        data.isLoggedIn=true;
    }
    return res.render('home', data);
})
router.get('/contact-us', (req, res) => {
    data={
        title: 'Contact Us | Grabitt',
        isLoggedIn: false
    }
    if (req.cookies.token) {
        data.isLoggedIn=true;
    }
    return res.render('contactus', data);
})
router.get('/privacy', (req, res) => {
    data={
        title: 'Privacy Policy | Grabitt',
        isLoggedIn: false
    }
    if (req.cookies.token) {
        data.isLoggedIn=true;
    }
    return res.render('privacy', data);
})

router.use(AuthRouter);
router.use(ResetRouter);
router.use(SubjectRouter);
router.use(QuestionRouter);
router.use(isSignedIn, ExamRouter);
router.use(isSignedIn, DashboardRouter);
router.use(isSignedIn, ResultRouter);
router.use(('/admin'), isSignedIn, isAdmin, SuperAdminRoute);


module.exports=router;
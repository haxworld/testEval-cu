const express = require('express');
const { isSignedIn, isAdmin } = require('./helpers/verifyToken');
const AuthRouter = require('./routes/AuthRoute');
const ProfileRouter = require('./routes/ProfileRoute');
const QuestionRouter = require('./routes/QuestionRoute');
const SubjectRouter = require('./routes/SubjectRoute');
const SuperAdminRoute = require('./routes/SuperAdminRoute');
const router = express.Router();

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

router.get('/profile', (req, res) => {
    const data = {
        title: 'Add Question',
    }
    return res.render('admin/profile', { data });
})

router.use(AuthRouter);
router.use(SubjectRouter);
router.use(isSignedIn, QuestionRouter);
router.use(isSignedIn, ProfileRouter);
router.use(isSignedIn, isAdmin, SuperAdminRoute);

router.get('/test', isSignedIn, (req, res) => {
    // console.log('Cookies: ', req.cookies)

    return res.json("gfhf")
})


module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const { home } = require('nodemon/lib/utils');
const { isSignedIn, isAdmin } = require('./helpers/verifyToken');
const AuthRouter = require('./routes/AuthRoute');
const ProfileRouter = require('./routes/ProfileRoute');
const QuestionRouter = require('./routes/QuestionRoute');
const SubjectRouter = require('./routes/SubjectRoute');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home', {
        title: 'Home',
        url1: '#features',
        a: 'About Us',
        url2: '#features',
        b: 'Features',
        url3: '/signup',
        c: 'Sign-up'
    });
})

router.get('/profile', (req, res) => {
    return res.render('admin/profile', {
        title: 'Profile',
        url1: '#categories',
        a: 'Categories',
        url2: '/#features',
        b: 'Features',
        url3: '/logout',
        c: 'Logout'
    });
})

router.use(AuthRouter);
router.use(SubjectRouter);
router.use(isSignedIn, QuestionRouter);
router.use(isSignedIn, ProfileRouter);

router.get('/test', isSignedIn, (req, res) => {
    // console.log('Cookies: ', req.cookies)

    return res.json("gfhf")
})


module.exports = router;
const express = require('express');
const { isSignedIn, isAdmin } = require('./helpers/verifyToken');
const AuthRouter = require('./routes/AuthRoute');
const ProfileRouter = require('./routes/ProfileRoute');
const QuestionRouter = require('./routes/QuestionRoute');
const SubjectRouter = require('./routes/SubjectRoute');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home');
})

router.get('/profile',(req,res)=>{
    return res.render('admin/profile');
})

router.use(AuthRouter);
router.use(SubjectRouter);
router.use(QuestionRouter);
router.use(isSignedIn, ProfileRouter);

router.get('/test', isSignedIn, isAdmin, (req, res) => {
    return res.json(req.user)
})


module.exports = router;
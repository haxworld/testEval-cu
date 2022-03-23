const express = require('express');
const AuthRouter = require('./routes/AuthRoute');
const SubjectRouter = require('./routes/SubjectRoute');
const router = express.Router();


router.get('/', (req, res) => {
    return res.render('home');
})

router.use(AuthRouter);
router.use(SubjectRouter);


module.exports = router;
const express = require('express');
const AuthRouter = require('./routes/AuthRoute');
const router = express.Router();


router.get('/', (req, res) => {
    return res.render('home');
})

router.use(AuthRouter);


module.exports = router;
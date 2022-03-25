const express = require('express');
const AuthRouter = require('./routes/AuthRoute');
const SeriesCatRouter = require('./routes/SeriesCat');
const router = express.Router();


router.get('/', (req, res) => {
    return res.render('home');
})

router.get('/profile',(req,res)=>{
    return res.render('admin/profile');
})

router.use(AuthRouter);
router.use(SeriesCatRouter);


module.exports = router;
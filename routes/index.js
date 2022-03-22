const express = require('express');
const router = express.Router();

console.log("Routes loaded")
router.get('/', (req, res) => {
    res.render('index')
})
router.get('/home',(req,res)=>{
    return res.render('home');
})

router.get("/login", (req, res) => {
    res.render('sign_in');
})

router.get("/signup", (req, res) => {
    res.render('sign_up');
})

router.post("/login", (req, res) => {
    let data = req.body;
    let email = data.email
    let password = data.password
    signIn(email, password)
        .then((value) => {
            return res.send(value)
        })
        .catch((err) => {
            return res.send(err)
        })
})

router.post("/signup", (req, res) => {
    let data = req.body;
    let email = data.email
    let password = data.password
    register(email, password)
        .then((value) => {
            return res.send(value)
        })
        .catch((err) => {
            return res.send(err)
        })

})
module.exports = router;
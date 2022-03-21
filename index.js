const express = require("express");
const app = express();
const port = 3000;
// const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors')

//firebase
const { register, signIn } = require('./controller/auth');
require('./firebase.service')


app.use(cors())
app.use(express.urlencoded());

// extract styles and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set the view engine to ejs
app.set("view engine", "ejs");
// app.set("views", "views");

app.get('/', (req, res) => {
    res.render('index')
})

app.get("/login", (req, res) => {
    res.render('sign_in');
})

app.get("/signup", (req, res) => {
    res.render('sign_up');
})

app.post("/login", (req, res) => {
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

app.post("/signup", (req, res) => {
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


app.listen(3000, () => {
    console.log("http://localhost:3000");
})
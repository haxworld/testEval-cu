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
app.use(express.json());

// extract styles and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set the view engine to ejs
app.set("view engine", "ejs");
// app.set("views", "views");



// use assets
app.use(express.static('./assets'))

// use express router
app.use('/', require('./router'));


app.listen(3000, () => {
    console.log("http://localhost:3000");
})
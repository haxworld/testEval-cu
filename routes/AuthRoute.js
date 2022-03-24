const express = require('express');
const { signIn, register, createSession } = require('../controller/auth');
const AuthRoute = express.Router();

AuthRoute
    .get("/login", (req, res) => {
        res.render('sign_in');
    })
    .post("/login", (req, res) => {
        let email = req.body.email
        let password = req.body.password
        signIn(email, password)
            .then((value) => {
                console.log(value.token)
                console.log(createSession(value.token));
                const options = { maxAge: expiresIn, httpOnly: true, secure: true };
                res.cookie('session', sessionCookie, options);
                res.end(JSON.stringify({ status: 'success' }));
                // return res.send(value)
            })
            .catch((err) => {
                return res.send(err)
            })
    })

AuthRoute
    .get("/signup", (req, res) => {
        res.render('sign_up');
    })
    .post("/signup", (req, res) => {
        let email = req.body.email
        let password = req.body.password
        register(email, password)
            .then((value) => {
                return res.send(value)
            })
            .catch((err) => {
                return res.send(err)
            })

    })

module.exports = AuthRoute;
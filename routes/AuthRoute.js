const express = require('express');
const { signIn, register } = require('../controllers/auth');
const { generateToken, generateRefreshToken } = require('../helpers/jwtTokens');
const refreshTokenModel = require('../models/refreshTokenModel');
const AuthRoute = express.Router();

AuthRoute
    .get("/login", (req, res) => {
        res.render('sign_in');
    })
    .post("/login", (req, res) => {
        let email = req.body.email
        let password = req.body.password
        signIn(email, password)
            .then(async (user) => {
                if (user._id) {
                    const token = await generateToken(user);
                    const refreshToken = await generateRefreshToken(user);
                    res.cookie('refreshToken', refreshToken.token);
                    res.cookie('token', token);
                    // return res.header('auth-token', token).json({
                    //     token, refreshToken: refreshToken.token
                    // });
                    return res.redirect('/profile')
                }
                return res.send("Unknown error occoured!")
            })
            .catch((err) => {
                console.log(err)
                return res.send(err)
            })
    })

AuthRoute
    .get("/signup", (req, res) => {
        res.render('sign_up');
    })
    .post("/signup", (req, res) => {
        let data = req.body
        register(data)
            .then((value) => {
                console.log(value)
                return res.status(200).send(value)
            })
            .catch((err) => {
                console.log(err)
                return res.status(400).send(err)
            })

    })

AuthRoute
    .post("/refreshtoken", async (req, res) => {
        let token = req.body.token;
        let refreshToken = ''
        const findtoken = await refreshTokenModel.findOne({ token: token })

        if (!findtoken) {
            return res.status(400).json("Invalid Token")
        }
        if (findtoken.isExpired) {
            return res.status(401).json("Login again!")
        }
        let user = {
            _id: findtoken.user
        }
        token = await generateToken(user);
        refreshToken = await generateRefreshToken(user);

        res.cookie('refreshToken', refreshToken.token)
        res.cookie('token', token)
        return res.header('auth-token', token).json({
            token, refreshToken: refreshToken.token
        });
    })
AuthRoute
    .get('/logout', function (req, res) {
        req.logOut();
        req.session.destroy(function (err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });
module.exports = AuthRoute;
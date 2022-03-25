const expressJwt = require('express-jwt')
const User = require('../models/userModel')


exports.isSignedIn = expressJwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256']
})

exports.isAdmin = async function (req, res, next) {
    let { role } = await User.findOne({
        _id: req.user.id
    })
    if (!role) {
        return res.status(401).json("not authorized!")
    }
    next()
}
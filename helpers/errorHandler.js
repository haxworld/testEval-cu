const { generateRefreshToken, generateToken } = require("./jwtTokens");

const refreshTokenModel = require("../models/refreshTokenModel");

module.exports = async (err, req, res, next) => {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            return res.status(statusCode).json({ message: err });
        case err.name === 'ValidationError':
            return res.status(400).json({ message: err.message });
        case err.name === 'UnauthorizedError':
            if (req.cookies && req.cookies.token && req.cookies.refreshToken) {
                let refreshToken = ''
                const findtoken = await refreshTokenModel.findOne({ token: req.cookies.refreshToken })
                if (!findtoken) {
                    return res.status(400).json("Invalid Token")
                }
                if (findtoken.isExpired) {
                    // return res.status(401).json("Login again!")
                    return res.status(401).redirect('/login')
                }
                let user = {
                    _id: findtoken.user
                }
                let token = await generateToken(user);
                refreshToken = await generateRefreshToken(user);

                res.cookie('refreshToken', refreshToken.token)
                res.cookie('token', token)
                return next()
            }
            return res.status(401).redirect('/login')
        // return res.status(401).json({ message: 'Unauthorized' });

        default:
            return res.status(500).json({ message: err.message });
    }
}


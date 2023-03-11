const jwt = require('jsonwebtoken')
const User = require('../models/user')
const MediaReporter = require('../models/mediaReporter')
exports.isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifytoken._id);
        const reporter = await MediaReporter.findById(verifytoken._id);

        if (!user && !reporter) {
            return res.json({ success: false, message: 'unauthorized access!' })
        }
        (user)?(req.user = user):(req.user = reporter);
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.json({ success: false, message: 'unauthorized access!' })
        }
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'sesson expierd try sign in!' })
        }
        return res.json({ success: false, message: 'Internal server error' })
    }

}
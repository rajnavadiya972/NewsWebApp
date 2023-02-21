const jwt = require('jsonwebtoken')
const User = require('../models/user')
exports.isAuth = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        try {
            const decode = jwt.verify(localStorage.getItem('token'), process.env.JWT_SECRET);
            const user = await User.findById(decode.userId);

            if (!user) {
                return res.json({ success: false, message: 'unauthorized access!' })
            }
            req.user = user;
            next();
        } catch (error) {
            if(error.name==='JsonWebTokenError'){
                return res.json({ success: false, message: 'unauthorized access!' })
            }
            if(error.name==='TokenExpiredError'){
                return res.json({ success: false, message: 'sesson expierd try sign in!' })
            }
            return res.json({ success: false, message: 'Internal server error' })
        }

    } else {
        res.json({ success: false, message: 'unauthorized access!' })
    }
}
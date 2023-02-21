const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.validateMediaReporterSignUp = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('username is empty')
        .isLength({ min: 3 })
        .withMessage('Name must be within 3 character'),

    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid Email'),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('password is empty')
        .isLength({ min: 8 })
        .withMessage('password must be within 8 character'),

    // check('confirmPassword')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .custom((value, { req }) => {
    //         if (value !== req.body.password) {
    //             throw new Error('Both password must be same');
    //         }
    //         return true;
    //     })
]

exports.mediaReporterValidation = async (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error })
}


exports.validateMediaReporteSignIn = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('username / password is required!'),

    // check('email')
    //     .normalizeEmail()
    //     .isEmail()
    //     .withMessage('Invalid Email'),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('username / password is required!'),
]
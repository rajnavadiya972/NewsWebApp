const { check, validationResult } = require('express-validator')

exports.validateCreateNews = [
    check('title')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Title is empty')
        .isLength({ min: 3 })
        .withMessage('Title must be within 3 character'),

    check('description')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Description is empty')
        .isLength({ min: 3 })
        .withMessage('Description must be within 3 character'),

    check('catagory')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Catagory is empty'),
]
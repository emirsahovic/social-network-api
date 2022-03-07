import { check, validationResult } from 'express-validator';

const registerValidateUser = [
    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required')
        .bail(),
    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address')
        .isEmail()
        .withMessage('Invalid email address')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map(err => err.msg);
            const msg = err[0];
            res.status(422);
            throw new Error(msg);
        }
        next();
    },
];

export { registerValidateUser }

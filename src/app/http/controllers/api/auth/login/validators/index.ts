
import { body } from 'express-validator';

const validators = [
    body('email').notEmpty().withMessage('email is required'),
    body('email').isEmail().withMessage('email is not valid'),
    // password must be at least 5 chars long
    body('password').notEmpty().withMessage('password is required')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
]

export default validators;
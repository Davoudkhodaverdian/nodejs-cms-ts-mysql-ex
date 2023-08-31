
import { body } from 'express-validator';

const validators = [
    // if we dont have withMessage property,the message is defualt
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('lastName').notEmpty().withMessage('lastName is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('email').isEmail().withMessage('email is not valid'),
    // body('phoneNumber').isMobilePhone("fa-IR").withMessage('phoneNumber is not valid'),
    // body('phoneNumber').notEmpty().withMessage('phoneNumber is required'),
    // password must be at least 5 chars long
    body('password').notEmpty().withMessage('password is required')
        .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
]

export default validators;
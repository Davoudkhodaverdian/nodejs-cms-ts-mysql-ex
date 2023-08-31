import express from 'express';
import validators from '../../../../http/controllers/api/auth/register/validators';
import validateExpress from '../../../../http/controllers/validation';
import register from '../../../../http/controllers/api/auth/register';
const router = express.Router();
// registerController sended as this in registerController
router.post('/register', validators, validateExpress, register);

export default router;
import express from 'express';
import validators from '../../../../http/controllers/api/auth/login/validators';
import validateExpress from '../../../../http/controllers/validation';
import login from '../../../../http/controllers/api/auth/login';

const router = express.Router();
// loginController sended as this in loginController
router.post('/login', validators, validateExpress, login);

export default router;
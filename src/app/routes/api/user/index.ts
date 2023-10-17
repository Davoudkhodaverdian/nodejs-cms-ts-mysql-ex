import express from 'express';
import verifyAuthToken from '../../../http/middlewares/auth';
import user from '../../../http/controllers/api/user';

const router = express.Router();

router.get('/', verifyAuthToken, user);


export default router;
import express from 'express';
import registerROuter from './register';
import loginROuter from './login';
const router = express.Router();

router.use('/', registerROuter);
router.use('/', loginROuter);

export default router;
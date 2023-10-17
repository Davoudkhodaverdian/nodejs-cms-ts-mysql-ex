import express from 'express';
import { Request, Response } from 'express';
import adminRouter from './admin';
import authRouter from './auth';
import userRouter from './user';
const router = express.Router();

router.get('/',(req: Request, res: Response) => {

    res.send(`api route ${process.env.NODE_ENV} environment`);
});
router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
export default router;
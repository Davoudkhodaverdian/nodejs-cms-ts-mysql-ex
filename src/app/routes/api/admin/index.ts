import express from 'express';
import { Request, Response } from 'express';
import usersRouter from './users';
import blogsRouter from './blogs';
import authusersRouter from './authusers';
const router = express.Router();

router.get('/',(req: Request, res: Response) => {

    res.send(`admin route ${process.env.NODE_ENV} environment`);
});
router.use('/', usersRouter);
router.use('/', blogsRouter);
router.use('/', authusersRouter);
export default router;
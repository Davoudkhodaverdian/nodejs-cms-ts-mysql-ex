import express from 'express';
import apiRouter from './api';
import { Request, Response } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {

    res.send(`Home route ${process.env.NODE_ENV} environment`);
});
router.use('/api', apiRouter);
export default router;

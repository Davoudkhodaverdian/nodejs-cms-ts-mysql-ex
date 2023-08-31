import express from 'express';
import { Request, Response } from 'express';
import db from '../../../../setup/mysqlConnection';

const router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });


});

export default router;
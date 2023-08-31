import express from 'express';
import { Request, Response } from 'express';
import db from '../../../../setup/mysqlConnection';

const router = express.Router();

router.get('/authusers', (req: Request, res: Response) => {
    const sql = "SELECT * FROM authusers"
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });


});

export default router;
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { NextFunction, Request, Response } from 'express';
import config from "../../config";
import db from "../../setup/mysqlConnection";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {

    let token = req.cookies?.['nightlearn-token'] !== 'undefined' && req.cookies?.['nightlearn-token'] ||
        req.headers?.authorization !== 'undefined' && req.headers?.authorization ||
        req.body?.token !== 'undefined' && req.body?.token || req.query?.token !== 'undefined' && req.query?.token ||
        req.headers['x-access-token'] !== 'undefined' && req.headers['x-access-token'];

        if (!token) {
            return res.status(403).json({
                status: 403,
                response: { status: 'fail', message: 'unauthorized' }
            })
        }


    jwt.verify(token, config.secret, (error: VerifyErrors, decode: JwtPayload) => {

         if (error) {
            return res.status(422).json({
                status: 422,
                response: { error: { message: "filed to authenticate token" } }
            })
        }
        db.query(
            `SELECT * FROM authusers WHERE LOWER(id) = LOWER(${decode.user_id});`,
            (err, result) => {
                if (err) {
                    return res.status(409).send({
                        error: {
                            response: err,
                            message: 'متاسفانه خطایی رخ داده است',
                        },
                        status: 409
                    });
                }
                if (result.length) {
                    req['result'] = result[0];
                    next();
                } else {
                    return res.status(422).json({
                        status: 422,
                        response: { error: { message: "user not found" } }
                    });
                }
            })
    })
}

export default verifyAuthToken;
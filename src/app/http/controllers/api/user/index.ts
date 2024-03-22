import { Request, Response } from 'express';
import transform from '../../../../transform';

const user = (req: Request, res: Response) => {

  return res.status(200).json({
    status: 200,
    response: {
     // using transform class for get limited data for people that they are not admin
     user: transform(req['result'],
     ['firstname', 'lastname', 'email', 'phonenumber', 'created_at', 'updated_at'])
    }
  });

}

export default user
import { Request, Response } from 'express';
import db from '../../../../../setup/mysqlConnection';
import bcrypt from 'bcrypt';
import createToken from '../../../createToken';

const login = (req: Request, res: Response) => {

  try {
    const { email, password } = req.body

    // mysql
    db.query(
      `SELECT * FROM authusers WHERE LOWER(email) = LOWER(${db.escape(email)});`,
      (err, result) => {
        if (err) {
          return res.status(409).send({
            error: {
              response: err,
              message: 'متاسفانه خطایی رخ داده است',
              status: 409
            }
          });
        }
        if (result.length) {
          // check password for login
          bcrypt.compare(password, result[0]['password'], (bcryptError, bcryptResult) => {
            if (bcryptError) {
              return res.status(409).send({
                error: {
                  response: bcryptError,
                  message: 'متاسفانه خطایی رخ داده است',
                },
                status: 409
                });
            } else if (bcryptResult) {
              return res.status(200).json({
                message: 'You have successfully logged in',
                response: {
                  data:{
                    firstName: result[0]['firstname'], 
                    lastName: result[0]['lastname'], 
                    email: result[0]['email'], 
                    phoneNumber: result[0]['phonenumber'],
                    tocken: createToken(result[0]['id']),
                    created_at:result[0]['created_at'],
                    updated_at: result[0]['updated_at'],
                } } ,
                status: 200
              });
            } else {
              return res.status(409).send({
                error: {
                  response: {message:"The password is incorrect"},
                  message: 'پسورد وارد شده صحیح نمی باشد',
                },
                status: 409
              })
            }
          })
        } else {
          // username not found
          return res.status(409).send({
            error: {
              // message: 'This email is not found!',
              message: 'چنین ایمیلی ثبت نشده است، لطفا ثبت نام کنید',
              response: {
                message: 'This email is not found!',
              },
            },
            status: 409
          });
        }
      }
    );

  } catch (error) {
    return res.status(409).send({
      error: {
        response: error,
        message: 'متاسفانه خطایی رخ داده است',
      },
      status: 409
    });

    //if (error) throw error;
  }

}

export default login;
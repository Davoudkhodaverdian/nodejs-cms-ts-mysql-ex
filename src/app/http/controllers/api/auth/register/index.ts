import { Request, Response } from 'express';
import db from '../../../../../setup/mysqlConnection';
import bcrypt from 'bcrypt';
import createToken from '../../../createToken';


const register = (req: Request, res: Response) => {

  try {

    const { firstName, lastName, email, phoneNumber, password } = req.body
    //create the user and save
    // mysql
    const salt = 10;
    // check if user already exist
    db.query(
      `SELECT * FROM authusers WHERE LOWER(email) = LOWER(${db.escape(email?.toLowerCase())});`,
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
          return res.status(409).send({
            error: {
              // message: 'This email user is already in use!',
              message: 'این ایمیل قبلا استفاده شده است، لطفا وارد شوید',
              response: {
                message: 'This email user is already in use!',
              },
            },
            status: 409
          });
        } else {
          // email is available

          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return res.status(409).send({
                error: {
                  message: 'متاسفانه خطایی رخ داده است',
                  response: err,
                },
                status: 409
              });
            } else {
              // has hashed pw => add to database
              var sql = `INSERT INTO authusers (firstName, lastName, email, phoneNumber, password) VALUES ('${firstName}', '${lastName}', ${db.escape(email?.toLowerCase())}, 
                            '${phoneNumber}', ${db.escape(hash)})`;
              db.query(
                sql,
                (err, re) => {
                  if (err) {
                    return res.status(409).send({
                      error: {
                        message: 'متاسفانه خطایی رخ داده است',
                        response: err,
                      },
                      status: 409
                    });
                  }
                  // verify registering and create token
                  db.query(
                    `SELECT * FROM authusers WHERE LOWER(email) = LOWER(${db.escape(email?.toLowerCase())});`,
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
                        return res.status(200).json({
                          message: 'The user has been registerd with us!',
                          response: {
                            data: {
                              firstName: result[0]['firstname'], 
                              lastName: result[0]['lastname'], 
                              email: result[0]['email'], 
                              phoneNumber: result[0]['phonenumber'],
                              tocken: createToken(result[0]['id']),
                              created_at:result[0]['created_at'],
                              updated_at: result[0]['updated_at'],
                            }
                          },
                          status: 200
                        });
                      } else {
                        // username not found
                        return res.status(409).send({
                          error: {
                            // message: 'This email is not found!',
                            message: 'متاسفانه خطایی رخ داده است',
                            response: {
                              message: 'This email is not found!',
                            },
                          },
                          status: 409
                        });
                      }
                    })
                  // only verify registering without create token
                  // return res.status(200).json({
                  //   response: { user: { firstName, lastName, email: email.toLowerCase(), phoneNumber } },
                  //   message: 'The user has been registerd with us!',
                  //   status: 200
                  // });
                }
              );
            }
          });
        }
      }
    );
    // mogodb
    // newUser.save((error: Error, user: IUser) => {
    //   if (error) {
    //     if (error?.['code'] == 11000 && Object.keys(error?.['keyValue']).includes('email')) {
    //       return res.status(422).json({
    //         error: { ...error, message: "ایمیل وارد شده تکراری است و قبلا ثبت شده است" }
    //       });
    //     }
    //   } else {
    //     //create token
    //     return res.status(200).json({
    //       user: new Transform().transform<IUser>(user, ['firstName', 'lastName', 'email']),
    //       token: createToken(user._id)
    //     });

    //   }
    // });

  } catch (error) {

    return res.status(409).send({
      error: {
        response: error,
        message: 'متاسفانه خطایی رخ داده است',
        status: 409
      }
    });

    //if (error) throw error;
  }
}

export default register;
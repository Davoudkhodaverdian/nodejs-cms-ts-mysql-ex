import jwt from 'jsonwebtoken';
import config from './../../../config';
const { secret } = config;

const  createToken = (id : string)=> {

    let token = jwt.sign({ user_id: id }, secret);
    return token;
}
export default createToken;
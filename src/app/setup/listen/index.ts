
import cors from 'cors';
import config from './../../config';
// import http from 'http';
import { Express } from 'express';

const { port } = config;
const listen = (app: Express) => {

    app.use(cors({
        origin: process.env.NODE_ENV === 'production' ? process.env.APP_DOMAIN : `http://localhost:3000`,
        credentials: true
    }));
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
    // const server = http.createServer(app);
    // server.listen(port, () => {
    //   return console.log(`Express is listening at http://localhost:${port}`);
    // });
}

export default listen;


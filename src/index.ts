import dotenv from 'dotenv';
import { Express } from 'express';
import homeRouter from './app/routes';
import listen from './app/setup/listen';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// set dotenv
dotenv.config({ path: '.env' }); // for process.env
dotenv.config({ path: '.env.local' }); // for process.env

// setup express
const app : Express = express();

// this is for body start
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("mySecretkey"));
// parse requests of content-type - application/json
// app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// this is for body end

// listening Express
listen(app);

// set router
app.use('/', homeRouter);



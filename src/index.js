import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import eventRoute from "./routes/eventRoute.js";
import validateRoute from './routes/validateRoute.js';
dotenv.config();
const app = express();

// This variabel stores the value in env file to connect to DB
let connect;

const executorFunction = (resolve, reject) => {
    //This is just an executorFunction of a promise for connecting to DB
    connect = process.env.CONNECT_DB;

    if (connect) {
        resolve(connect);
    } else {
        reject("fail to read .env file");
    }
}

const read_env = () => {
    // This function return a promise which will try to connect to DB
    return new Promise(executorFunction);
}

app.use(cors({
  origin: '*'
}));

// SECURE API
const prefix = "/api";
app.use(prefix + '/events', eventRoute)
app.use(prefix + '/validate', validateRoute)

//Connecting to DB
read_env()
.then((e) => {
    console.log("Connecting to Database....")
    mongoose.connect(e, {autoIndex: true})
})
.then(() => console.log('Database connected'))
.catch(() => {
    console.log('fail to connect to DB')
})

const port = process.env.PORT || 443;
app.listen(port, () => console.log(`Listening on port ${port} : http://localhost:${port}`));
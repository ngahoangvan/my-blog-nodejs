import "reflect-metadata";
import { createConnection } from "typeorm";
import path from 'path';
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import * as helpers from './helpers';



// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests

createConnection().then(async connection => {
    // create express app
    const app = express();

    app.use('/public', express.static(helpers.publicPath()))
    app.use(express.static(path.join(__dirname, '../../client/public')));

    // Call middlewares
    app.use(cors());
    app.options('*', cors());
    app.use(cors({ origin: true, credentials: true }));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(errorHandler)

    app.use("/api", routes);

    // run app
    app.listen(3000, () => {
        console.log("Express application is up and running on port 3000");
    });

}).catch(error => console.log("TypeORM connection error: ", error));
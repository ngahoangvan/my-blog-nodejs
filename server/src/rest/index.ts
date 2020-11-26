import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests

createConnection().then(async connection => {
    // create express app
    const app = express();

    // Call middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use("/api", routes);

    // run app
    app.listen(3000, () => {
        console.log("Express application is up and running on port 3000");
    });

}).catch(error => console.log("TypeORM connection error: ", error));
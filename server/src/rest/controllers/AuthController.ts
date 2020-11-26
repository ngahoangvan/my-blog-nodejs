import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../../entity/User";
import config from "../config/config";

class AuthController {
    // TODO

    static signIn = async (req: Request, res: Response) => {

    }

    static changePassword = async (req: Request, res: Response) => {

    }
}

export default AuthController;

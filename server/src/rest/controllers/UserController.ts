import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../../entity/User";
import { ERRORS_CODE } from "../commnons/constants";
import * as bcrypt from "bcrypt"
import * as helpers from '../helpers'
import { validate } from "class-validator";



/**
 * Loads all users from the database.
 */
export async function listAll(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    // load a user by a given user id
    const users = await userRepository.find();
    const count = await userRepository.count();
    // return loaded users
    response.send({
        users,
        count
    });
}

/**
 * Loads one users from the database.
 */
export async function getOneById(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    // load a user by a given user id
    const user = await userRepository.findOne(request.params.id);
    user
        ? helpers.sendResponse(response, 200, user)
        : helpers.sendError(response, ERRORS_CODE.DOES_NOT_EXITS.message, 404)
}


/**
 * Create user.
 */
export async function newUser(request: Request, response: Response) {
    try {
        // get a user repository to perform operations with user
        const userRepository = getManager().getRepository(User);

        // paste data into user
        const data = request.body;
        let user = new User();
        // user = request.body;
        user.firstName = data.firstName;
        user.middleName = data.middleName;
        user.lastName = data.lastName;
        user.mobile = data.mobile;
        user.email = data.email;
        user.username = data.username;
        user.password = data.password;
        // create a real user object from user json object sent over http
        const errors = await validate(user);
        if (errors.length > 0) {
            return helpers.sendErrorValidate(response, errors)
        }
        user.hashPassword()

        // save received user
        await userRepository.save(user);
        // return saved user back
        return helpers.sendResponse(response, 201, user)
    } catch (error) {
        return helpers.sendError(response, error)
    }
}


/**
 * Create user.
 */
export async function userLoginAction(request: Request, response: Response) {
    try {
        // get a user repository to perform operations with user
        const userRepository = getManager().getRepository(User);
        const data = request.body;
        data.passwordHash = await bcrypt.hash(data.password, 10);
        // create a real user object from user json object sent over http
        const newUser = userRepository.create(data);
        // save received user
        await userRepository.save(newUser);
        // return saved user back
        response.send(newUser);
    } catch (error) {
        response.status(403).send(error)
    }
}

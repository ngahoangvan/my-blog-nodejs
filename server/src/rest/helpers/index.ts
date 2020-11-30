import path from 'path';
import { Response } from 'express';
import HttpException from '../exceptions/HttpException';

export const sendResponse = (res: Response, status = 201, data = {}, message = null) => {
    let response: any = {};

    if ([200, 201].includes(status)) {
        response.status = status;
        response.data = data;

        if (message) {
            response.message = message;
        }
    }

    return res.status(status || 200).send(response);
}

export const sendError = (res: Response, error: any, status = 400) => {

    let message
    switch (error.code) {
        case 'ER_DUP_ENTRY':
            message = error.sqlMessage
            break
        default:
            message = 'Something is wrong'
    }

    let response = {
        status,
        message
    };

    return res.status(status || 200).send(response);
}

export const publicPath = (file = null) => {
    if (file) {
        return path.join(__dirname, `public/${file}`);
    } else {
        return path.join(__dirname, 'public');
    }
}

export const sendErrorValidate = (res: Response, errors: any) => {
    const status = 422;
    if (errors.length > 0) {
        let response = {
            status,
            errors: errors.map((element: any) => {
                return {
                    property: element.property,
                    constraints: element.constraints
                }
            })
        };
        return res.status(status).json(response);
    }
}

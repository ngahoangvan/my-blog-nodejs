import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const errorHandler = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;
    const errors = {
        status: status,
        errors: {
            message: err.message,
        }
    };

    // if (process.env.NODE_ENV != 'production') {
    //     // errors.error.method = req.method;
    //     // errors.error.url = req.url || '';
    //     // errors.error.stack = err.stack || '';
    // }

    return res.status(status).send(errors);
}

export default errorHandler;
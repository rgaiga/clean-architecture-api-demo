import { Request, Response, NextFunction as Next } from 'express';

import { HttpStatusCode } from '@presentation/enums';
import { InternalServerError } from '@presentation/errors';
import { Middleware, HttpRequest } from '@presentation/http-interfaces';

export const expressMiddleware =
    <T, U>(middleware: Middleware<T, U>) =>
    async (req: Request, res: Response, next: Next) => {
        const httpRequest: HttpRequest<T> = {
            headers: {
                'x-access-token': req.headers['x-access-token'] as string,
            },
            body: req.body as T,
        };

        try {
            const { statusCode, data, error } = await middleware.handleRequest(
                httpRequest,
            );

            if (!error) {
                Object.assign(req, data);

                next();
            } else {
                res.status(statusCode).send(error);
            }
        } catch (error) {
            console.error(error);

            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(
                new InternalServerError(),
            );
        }
    };

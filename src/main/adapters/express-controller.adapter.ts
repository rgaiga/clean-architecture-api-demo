import { Request, Response } from 'express';

import { HttpStatusCode } from '@presentation/enums';
import { InternalServerError } from '@presentation/errors';
import { Middleware, HttpRequest } from '@presentation/http-interfaces';

export const expressController =
    <T, U>(controller: Middleware<T, U>) =>
    async (req: Request, res: Response) => {
        const httpRequest: HttpRequest<T> = {
            headers: {
                'x-access-token': req.headers['x-access-token'] as string,
            },
            body: req.body as T,
        };

        try {
            const { statusCode, data, error } = await controller.handleRequest(
                httpRequest,
            );

            if (!error) {
                res.status(statusCode).send(data);
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

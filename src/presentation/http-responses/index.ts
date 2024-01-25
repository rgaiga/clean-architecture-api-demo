import { HttpStatusCode } from '@presentation/enums';
import { InternalServerError } from '@presentation/errors';
import { HttpResponse } from '@presentation/http-interfaces';

export const HttpOk = <T>(data: T): HttpResponse<T> => ({
    statusCode: HttpStatusCode.OK,
    data,
});

export const HttpCreated = <T>(data: T): HttpResponse<T> => ({
    statusCode: HttpStatusCode.CREATED,
    data,
});

export const HttpNoContent = (): HttpResponse => ({
    statusCode: HttpStatusCode.NO_CONTENT,
});

export const HttpBadRequest = (error: Error): HttpResponse => ({
    statusCode: HttpStatusCode.BAD_REQUEST,
    error: {
        error: error.name,
        message: error.message,
    },
});

export const HttpUnauthorized = (error: Error): HttpResponse => ({
    statusCode: HttpStatusCode.UNAUTHORIZED,
    error: {
        error: error.name,
        message: error.message,
    },
});

export const HttpForbidden = (error: Error): HttpResponse => ({
    statusCode: HttpStatusCode.FORBIDDEN,
    error: {
        error: error.name,
        message: error.message,
    },
});

export const HttpInternalServerError = (): HttpResponse => {
    const error = new InternalServerError();

    return {
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        error: {
            error: error.name,
            message: error.message,
        },
    };
};

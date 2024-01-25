import { GetUserByAccessToken } from '@domain/use-cases';
import { AccessDeniedError } from '@presentation/errors';
import {
    HttpUnauthorized,
    HttpForbidden,
    HttpOk,
} from '@presentation/http-responses';
import { Middleware, HttpRequest } from '@presentation/http-interfaces';

interface Response {
    userId: string;
}

export class AuthMiddleware
    implements Middleware<unknown, Response | undefined>
{
    constructor(private readonly getUserByAccessToken: GetUserByAccessToken) {}

    async handleRequest(httpRequest: HttpRequest) {
        const accessToken = httpRequest.headers['x-access-token'];
        if (!accessToken) return HttpUnauthorized(new AccessDeniedError());

        const user = await this.getUserByAccessToken.getUserByAccessToken(
            accessToken,
        );
        if (!user) return HttpForbidden(new AccessDeniedError());

        return HttpOk({ userId: user.id });
    }
}

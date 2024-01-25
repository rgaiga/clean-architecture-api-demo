import { Auth } from '@domain/use-cases';
import { ValidationRule } from '@presentation/middlewares';
import { InvalidCredentialsError } from '@presentation/errors';
import { HttpUnauthorized, HttpOk } from '@presentation/http-responses';
import { Middleware, HttpRequest } from '@presentation/http-interfaces';

interface Request {
    email: string;
    password: string;
}

interface Response {
    accessToken: string;
}

export class SignInController
    implements Middleware<Request, Response | undefined>
{
    constructor(private readonly auth: Auth) {}

    async handleRequest(httpRequest: HttpRequest<Request>) {
        const { email, password } = httpRequest.body;

        const accessToken = await this.auth.authenticate({
            email,
            password,
        });
        if (!accessToken)
            return HttpUnauthorized(new InvalidCredentialsError());

        return HttpOk({ accessToken });
    }
}

export const signInValidationSchema: Record<string, ValidationRule> = {
    email: {
        type: ['email', 'O e-mail é inválido.'],
        required: [true, 'O e-mail não deve ser nulo.'],
        maxLength: [64, 'O e-mail deve ter no máximo 64 caracteres.'],
    },
    password: {
        type: ['string', 'A senha é inválida.'],
        required: [true, 'A senha não deve ser nula.'],
        minLength: [8, 'A senha deve ter no mínimo 8 caracteres.'],
        maxLength: [64, 'O senha deve ter no máximo 64 caracteres.'],
    },
};

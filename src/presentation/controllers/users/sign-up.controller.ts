import { CreateUser, Auth } from '@domain/use-cases';
import { ValidationRule } from '@presentation/middlewares';
import {
    PasswordMismatchError,
    EmailAlreadyRegisteredError,
} from '@presentation/errors';
import {
    HttpBadRequest,
    HttpInternalServerError,
    HttpCreated,
} from '@presentation/http-responses';
import { Middleware, HttpRequest } from '@presentation/http-interfaces';

interface Request {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface Response {
    accessToken: string;
}

export class SignUpController
    implements Middleware<Request, Response | undefined>
{
    constructor(
        private readonly createUser: CreateUser,
        private readonly auth: Auth,
    ) {}

    async handleRequest(httpRequest: HttpRequest<Request>) {
        const { name, email, password, passwordConfirmation } =
            httpRequest.body;

        if (password !== passwordConfirmation)
            return HttpBadRequest(new PasswordMismatchError());

        const createdUser = await this.createUser.createUser({
            name,
            email,
            password,
        });
        if (!createdUser)
            return HttpBadRequest(new EmailAlreadyRegisteredError());

        const accessToken = await this.auth.authenticate({
            email,
            password,
        });
        if (!accessToken) return HttpInternalServerError();

        return HttpCreated({ accessToken });
    }
}

export const signUpValidationSchema: Record<string, ValidationRule> = {
    name: {
        type: ['string', 'O nome é inválido.'],
        required: [true, 'O nome não deve ser nulo.'],
        maxLength: [64, 'O nome deve ter no máximo 64 caracteres.'],
    },
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
    passwordConfirmation: {
        type: ['string', 'A confirmação de senha é inválida.'],
        required: [true, 'A confirmação de senha não deve ser nula.'],
        minLength: [
            8,
            'A confirmação de senha deve ter no mínimo 8 caracteres.',
        ],
        maxLength: [
            64,
            'O confirmação de senha deve ter no máximo 64 caracteres.',
        ],
    },
};

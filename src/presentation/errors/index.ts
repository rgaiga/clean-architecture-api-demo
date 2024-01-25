export class InternalServerError extends Error {
    constructor() {
        super('Ops! Ocorreu um erro inesperado.');
        this.name = 'InternalServerError';
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super('O e-mail ou senha informados estão incorretos.');
        this.name = 'InvalidCredentialsError';
    }
}

export class AccessDeniedError extends Error {
    constructor() {
        super('Você não tem permissão para acessar este recurso.');
        this.name = 'AccessDeniedError';
    }
}

export class EmailAlreadyRegisteredError extends Error {
    constructor() {
        super('O e-mail informado já está associado a um usuário.');
        this.name = 'EmailAlreadyRegisteredError';
    }
}

export class PasswordMismatchError extends Error {
    constructor() {
        super('As senhas informadas são diferentes.');
        this.name = 'PasswordMismatchError';
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

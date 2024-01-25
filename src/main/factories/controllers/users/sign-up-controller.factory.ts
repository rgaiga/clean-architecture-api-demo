import { SignUpController } from '@presentation/controllers';
import {
    makeCreateUserDatabase,
    makeAuthDatabase,
} from '@main/factories/use-cases';

export const makeSignUpController = (): SignUpController => {
    const createUserDatabase = makeCreateUserDatabase();
    const authDatabase = makeAuthDatabase();

    return new SignUpController(createUserDatabase, authDatabase);
};

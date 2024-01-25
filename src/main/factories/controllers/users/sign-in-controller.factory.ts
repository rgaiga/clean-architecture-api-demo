import { SignInController } from '@presentation/controllers';
import { makeAuthDatabase } from '@main/factories/use-cases';

export const makeSignInController = (): SignInController => {
    const authDatabase = makeAuthDatabase();

    return new SignInController(authDatabase);
};

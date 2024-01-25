/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
    signUpValidationSchema,
    signInValidationSchema,
} from '@presentation/controllers';
import { expressController, expressMiddleware } from '@main/adapters';
import {
    makeSignInController,
    makeSignUpController,
} from '@main/factories/controllers';
import { makeValidationMiddleware } from '@main/factories/middlewares';

export const setupUsersRoute = (router: Router) => {
    router.post(
        '/users/sign-up',
        expressMiddleware(makeValidationMiddleware(signUpValidationSchema)),
        expressController(makeSignUpController()),
    );
    router.post(
        '/users/sign-in',
        expressMiddleware(makeValidationMiddleware(signInValidationSchema)),
        expressController(makeSignInController()),
    );
};

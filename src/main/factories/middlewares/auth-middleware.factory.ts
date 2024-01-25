import { AuthMiddleware } from '@presentation/middlewares';
import { makeGetUserByAccessTokenDatabase } from '@main/factories/use-cases';

export const makeAuthMiddleware = (): AuthMiddleware => {
    const getUserByAccessToken = makeGetUserByAccessTokenDatabase();

    return new AuthMiddleware(getUserByAccessToken);
};

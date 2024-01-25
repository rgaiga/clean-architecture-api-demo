import { UserModel } from '@domain/models';

export interface GetUserByAccessTokenRepository {
    getUserByAccessToken(accessToken: string): Promise<UserModel | null>;
}

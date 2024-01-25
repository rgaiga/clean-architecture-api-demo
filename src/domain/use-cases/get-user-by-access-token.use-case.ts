import { UserModel } from '@domain/models';

export interface GetUserByAccessToken {
    getUserByAccessToken(accessToken: string): Promise<UserModel | null>;
}

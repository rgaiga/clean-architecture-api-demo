import { UserModel } from '@domain/models';

export interface GetUserByEmailRepository {
    getUserByEmail(email: string): Promise<UserModel | null>;
}

import { UserModel, CreateUserModel } from '@domain/models';

export interface CreateUser {
    createUser(data: CreateUserModel): Promise<UserModel | null>;
}

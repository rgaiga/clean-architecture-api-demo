import { UserModel, CreateUserModel } from '@domain/models';

export interface CreateUserRepository {
    createUser(data: CreateUserModel): Promise<UserModel | null>;
}

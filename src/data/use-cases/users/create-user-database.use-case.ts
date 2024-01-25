import { UserModel, CreateUserModel } from '@domain/models';
import { CreateUser } from '@domain/use-cases';
import { CreateUserRepository, Hasher } from '@data/interfaces';

export class CreateUserDatabase implements CreateUser {
    constructor(
        private readonly createUserRepository: CreateUserRepository,
        private readonly hasher: Hasher,
    ) {}

    async createUser(data: CreateUserModel): Promise<UserModel | null> {
        const hashedPassword = await this.hasher.hash(data.password);

        return this.createUserRepository.createUser({
            ...data,
            password: hashedPassword,
        });
    }
}

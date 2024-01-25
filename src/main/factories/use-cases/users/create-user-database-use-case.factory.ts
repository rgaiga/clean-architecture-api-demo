import { CreateUser } from '@domain/use-cases';
import { CreateUserDatabase } from '@data/use-cases';
import { BcryptAdapter } from '@infra/crypto';
import { UserMongoRepository } from '@infra/database/mongo/repositories';
import { env } from '@main/config';

export const makeCreateUserDatabase = (): CreateUser => {
    const userMongoRepository = new UserMongoRepository();
    const bcryptAdapter = new BcryptAdapter(env.HASHER_SALT_ROUNDS);

    return new CreateUserDatabase(userMongoRepository, bcryptAdapter);
};

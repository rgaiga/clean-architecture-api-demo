import { Auth } from '@domain/use-cases';
import { AuthDatabase } from '@data/use-cases';
import { BcryptAdapter, JwtAdaper } from '@infra/crypto';
import { UserMongoRepository } from '@infra/database/mongo/repositories';
import { env } from '@main/config';

export const makeAuthDatabase = (): Auth => {
    const userMongoRepository = new UserMongoRepository();
    const bcryptAdapter = new BcryptAdapter(env.HASHER_SALT_ROUNDS);
    const jwtAdapter = new JwtAdaper(env.ENCRYPTER_PRIVATE_KEY);

    return new AuthDatabase(
        userMongoRepository,
        userMongoRepository,
        bcryptAdapter,
        jwtAdapter,
    );
};

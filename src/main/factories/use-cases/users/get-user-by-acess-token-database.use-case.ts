import { GetUserByAccessToken } from '@domain/use-cases';
import { GetUserByAccessTokenDatabase } from '@data/use-cases';
import { JwtAdaper } from '@infra/crypto';
import { UserMongoRepository } from '@infra/database/mongo/repositories';
import { env } from '@main/config';

export const makeGetUserByAccessTokenDatabase = (): GetUserByAccessToken => {
    const userMongoRepository = new UserMongoRepository();
    const jwtAdaper = new JwtAdaper(env.ENCRYPTER_PRIVATE_KEY);

    return new GetUserByAccessTokenDatabase(userMongoRepository, jwtAdaper);
};

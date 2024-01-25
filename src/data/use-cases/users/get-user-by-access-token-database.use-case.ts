import { UserModel } from '@domain/models';
import { GetUserByAccessToken } from '@domain/use-cases';
import { GetUserByAccessTokenRepository, Decrypter } from '@data/interfaces';

export class GetUserByAccessTokenDatabase implements GetUserByAccessToken {
    constructor(
        private readonly getUserByAccessTokenRepository: GetUserByAccessTokenRepository,
        private readonly decrypter: Decrypter,
    ) {}

    async getUserByAccessToken(accessToken: string): Promise<UserModel | null> {
        const decryptedAccessToken = this.decrypter.decrypt(accessToken);
        if (!decryptedAccessToken) return null;

        return this.getUserByAccessTokenRepository.getUserByAccessToken(
            accessToken,
        );
    }
}

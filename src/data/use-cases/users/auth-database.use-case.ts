import { AuthModel } from '@domain/models';
import { Auth } from '@domain/use-cases';
import {
    GetUserByEmailRepository,
    UpdateAccessTokenRepository,
    HashComparer,
    Encrypter,
} from '@data/interfaces';

export class AuthDatabase implements Auth {
    constructor(
        private readonly getUserByEmailRepository: GetUserByEmailRepository,
        private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encrypter,
    ) {}

    async authenticate(credentials: AuthModel): Promise<string | null> {
        const { email, password } = credentials;

        const user = await this.getUserByEmailRepository.getUserByEmail(email);
        if (!user) return null;

        const isPasswordValid = await this.hashComparer.compare(
            password,
            user.password,
        );
        if (!isPasswordValid) return null;

        const accessToken = this.encrypter.encrypt(user.id);
        await this.updateAccessTokenRepository.updateAccessToken(
            user.id,
            accessToken,
        );

        return accessToken;
    }
}

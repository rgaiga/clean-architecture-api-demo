import { AuthModel } from '@domain/models';

export interface Auth {
    authenticate(credentials: AuthModel): Promise<string | null>;
}

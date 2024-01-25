import jwt from 'jsonwebtoken';

import { Decrypter, Encrypter } from '@data/interfaces';

export class JwtAdaper implements Encrypter, Decrypter {
    constructor(private readonly privateKey: string) {}

    encrypt(data: string): string {
        return jwt.sign(data, this.privateKey);
    }

    decrypt(data: string): string | null {
        try {
            return jwt.verify(data, this.privateKey) as string;
        } catch (error) {
            return null;
        }
    }
}

import bcrypt from 'bcrypt';

import { Hasher, HashComparer } from '@data/interfaces';

export class BcryptAdapter implements Hasher, HashComparer {
    constructor(private readonly saltRounds: number) {}

    hash(data: string): Promise<string> {
        return bcrypt.hash(data, this.saltRounds);
    }

    compare(data: string, hashedData: string): Promise<boolean> {
        return bcrypt.compare(data, hashedData);
    }
}

import 'dotenv/config';

export const env = {
    SERVER_PORT: Number(process.env.SERVER_PORT) || 0,
    BASE_PATH: process.env.BASE_PATH ?? '',
    MONGODB_URL: process.env.MONGODB_URL ?? '',
    HASHER_SALT_ROUNDS: Number(process.env.HASHER_SALT_ROUNDS) || 0,
    ENCRYPTER_PRIVATE_KEY: process.env.ENCRYPTER_PRIVATE_KEY ?? '',
};

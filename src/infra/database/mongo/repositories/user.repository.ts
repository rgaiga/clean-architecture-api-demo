import { UserModel, CreateUserModel } from '@domain/models';
import {
    CreateUserRepository,
    GetUserByEmailRepository,
    GetUserByAccessTokenRepository,
    UpdateAccessTokenRepository,
} from '@data/interfaces';
import { MongoHelper, Document } from '@infra/database/mongo/mongo.helper';

export class UserMongoRepository
    implements
        CreateUserRepository,
        GetUserByEmailRepository,
        GetUserByAccessTokenRepository,
        UpdateAccessTokenRepository
{
    async createUser(data: CreateUserModel): Promise<UserModel | null> {
        const usersCollection = MongoHelper.getCollection('users');

        const user = await usersCollection.findOne({ email: data.email });
        if (user) return null;

        const createdUser = await MongoHelper.getCollection('users').insertOne(
            data,
        );

        return {
            id: createdUser.insertedId.toString(),
            name: data.name,
            email: data.email,
            password: data.password,
        };
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        const usersCollection = MongoHelper.getCollection('users');

        const user = await usersCollection.findOne<Document & UserModel>({
            email,
        });
        if (!user) return null;

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }

    async getUserByAccessToken(accessToken: string): Promise<UserModel | null> {
        const usersCollection = MongoHelper.getCollection('users');

        const user = await usersCollection.findOne<Document & UserModel>({
            accessToken,
        });
        if (!user) return null;

        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            password: user.password,
        };
    }

    async updateAccessToken(
        userId: string,
        accessToken: string,
    ): Promise<void> {
        const usersCollection = MongoHelper.getCollection('users');

        await usersCollection.updateOne(
            { _id: MongoHelper.parseObjectId(userId) },
            { $set: { accessToken } },
        );
    }
}

import { MongoClient, Collection, ObjectId } from 'mongodb';

export const MongoHelper = {
    client: null as unknown as MongoClient,

    async connect(url: string): Promise<void> {
        this.client = await MongoClient.connect(url);
    },

    async disconnect(): Promise<void> {
        await this.client.close();
    },

    getCollection(name: string): Collection {
        return this.client.db().collection(name);
    },

    parseObjectId(id: string): ObjectId {
        return new ObjectId(id);
    },
};

export interface Document {
    _id: ObjectId;
}

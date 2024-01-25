import 'module-alias/register';

import { env } from '@main/config';
import app from '@main/app';
import { MongoHelper } from '@infra/database/mongo/mongo.helper';

MongoHelper.connect(env.MONGODB_URL)
    .then(() =>
        app.listen(env.SERVER_PORT, () => {
            console.log(`Listening on port ${env.SERVER_PORT}...`);
        }),
    )
    .catch((error) => {
        throw error;
    });

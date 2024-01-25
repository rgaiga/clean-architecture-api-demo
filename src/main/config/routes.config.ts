import { Express, Router } from 'express';

import { env } from '@main/config';
import { setupUsersRoute } from '@main/routes';

export const setupRoutes = (app: Express): void => {
    const router = Router();

    app.use(env.BASE_PATH, router);

    setupUsersRoute(router);
};

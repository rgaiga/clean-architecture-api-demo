import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const setupMiddlewares = (app: Express): void => {
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
};

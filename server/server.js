import newrelic from 'newrelic';// eslint-disable-line no-unused-vars

import Express from 'express';
import * as path from 'path';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import cors from 'cors';
import logger from './common/logger';

const app = new Express();
const WinstonLogger = logger.init();

export default class ExpressServer {
    constructor() {
        const root = path.normalize(`${__dirname}/../..`);
        app.set('appPath', `${root}client`);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.disable('x-powered-by');
    }

    router(routes) {
        routes(app);
        return this;
    }

    listen(port = process.env.PORT) {
        const welcome = p => () => WinstonLogger.info(`Up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}`);
        http.createServer(app).listen(port, welcome(port));
        return app;
    }
}

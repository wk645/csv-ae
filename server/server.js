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

    async listen(port = process.env.PORT) {
        return new Promise(resolve => {
            const server = http.createServer(app).listen(port);

            server.on('listening', () => {
                WinstonLogger.info(`Up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}`);
                resolve(server);

                process.on('SIGINT', this.shutdown.bind(this, server));
                process.on('SIGTERM', this.shutdown.bind(this, server));
            });
            server.on('error', error => {
                WinstonLogger.error(`${error}`);
                process.exit(0);
            });
        });
    }

    shutdown(server) {
        server.close(() => {
            WinstonLogger.info(`Shutting down server on port: ${process.env.PORT}`);

            process.exit(0);
        });
    }
}

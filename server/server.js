import newrelic from 'newrelic';// eslint-disable-line no-unused-vars

import Express from 'express';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import WinstonLogger from './common/logger';

const app = new Express();

export default class ExpressServer {
    constructor() {
        app.set('appPath', `${global}client`);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.disable('x-powered-by');
        app.use(morgan(':date[web] [:method] ":url" STATUS::status'));
        app.use(morgan('dev', {
            skip: function (req, res) { // eslint-disable-line object-shorthand
                return res.statusCode < 400;
            },
            stream: process.stderr
        }));

        app.use(morgan('dev', {
            skip: function (req, res) { // eslint-disable-line object-shorthand
                return res.statusCode >= 400;
            },
            stream: process.stdout
        }));
    }

    router(routes) {
        routes(app);
        return this;
    }

    listen(port = process.env.PORT) {
        return new Promise(resolve => {
            const server = http.createServer(app).listen(port);

            server.on('listening', () => {
                WinstonLogger.info(`Up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}`);
                resolve(server);

                ['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, () => {
                    WinstonLogger.info(`Shutting down server on port: ${process.env.PORT}`);
                    process.exit(0);
                }));
            });
            server.on('error', error => {
                WinstonLogger.error(`${error}`);
                process.exit(0);
            });
        });
    }
}

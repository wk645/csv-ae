import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

// eslint-disable-next-line new-cap
const app = new express();
const httpServer = http.createServer(app);

const defaultPort = 3000;

export default class ExpressServer {
    constructor() {
        app.set('appPath', `${global}client`);
        app.use(bodyParser.json());
        app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
        app.use(cors());
        app.disable('x-powered-by');
    }

    router(routes) {
        routes(app);
        return this;
    }

    listen(port = defaultPort) {
        const httpPromise = new Promise(resolve => {
            httpServer
                .listen(port, () => {
                    resolve();
                })
                .on('error', () => {
                    process.exit(0);
                });
        });

        ['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, () => {
            process.exit(0);
        }));

        return Promise.all([httpPromise]).then(() => {
            const env = process.env.NODE_ENV || 'development';
            const ports = `${port} (HTTP)`;
            console.log(`Up and running in ${env} on port: ${ports}`);
            return app;
        });
    }
}

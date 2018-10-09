import Express from 'express';
import * as path from 'path';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import PinoLogger from './logger';

const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(Express.static(`${root}/public`));
    app.use('/', (req, res) => { res.json('Welcome to boilerplate_back_end_web'); });
  }

  router(routes) {
    routes(app);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => PinoLogger.info(`Up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}

import healthRouter from './api/controllers/health/router';
import homeRouter from './api/controllers/home/router';
import notFoundRouter from './api/controllers/not-found/router';

export default function routes(app) {
    app.use('/', homeRouter);
    app.use('/api/v1/healthcheck', healthRouter);

    // If the route is not found, the notFoundRouter will handle the request and return a 404
    app.use(notFoundRouter);
}

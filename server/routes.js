import healthRouter from './api/controllers/health/router';
import homeRouter from './api/controllers/home/router';
import notFoundRouter from './api/controllers/not-found/router';
import propertyRouter from './api/controllers/property/router';

export default function routes(app) {
    app.use('/', homeRouter);
    app.use('/api/v1/healthcheck', healthRouter);
    app.use('/api/v1/property', propertyRouter);

    app.use(notFoundRouter);
}

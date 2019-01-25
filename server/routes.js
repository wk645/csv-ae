import graphqlHTTP from 'express-graphql';
import healthRouter from './api/controllers/health/router';
import propertyRouter from './api/controllers/property/router';
import homeRouter from './api/controllers/home/router';
import notFoundRouter from './api/controllers/not-found/router';
import OktaAuthorizationHelper from './common/middleware/oktaAuthorizationHelper';
import swaggerRouter from './api/controllers/swagger/router';

import typeDefs from './api/graphql/schema';

export default function routes(app) {
    app.use('/', homeRouter);
    app.use('/api/service-boilerplate-back-end-web/v1/healthcheck', healthRouter);
    app.use('/api/service-boilerplate-back-end-web/v1/property', OktaAuthorizationHelper.hasPermissions(process.env.PROPERTY_SCOPE), propertyRouter);
    app.use('/api/service-boilerplate-back-end-web/v1/property/graphql', OktaAuthorizationHelper.hasPermissions(process.env.PROPERTY_SCOPE), graphqlHTTP({
        schema: typeDefs
    }));

    app.use('/api/service-boilerplate-back-end-web/v1/docs', swaggerRouter);
    app.use(notFoundRouter);
}

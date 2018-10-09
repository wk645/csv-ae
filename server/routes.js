import healthRouter from './api/controllers/health/router';

export default function routes(app) {
  app.use('/api/v1/health', healthRouter);
}

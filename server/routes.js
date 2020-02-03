import parserRouter from './api/controllers/parser/router';

export default function routes(app) {
    const baseUrl = '/api/ae/v1';

    app.use(`${baseUrl}/parse`, parserRouter);
}

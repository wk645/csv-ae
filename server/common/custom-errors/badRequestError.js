import HttpError from './httpError';

export default class BadRequestError extends HttpError {
    constructor(message) {
        super(message, 400, 'Bad Request.');
    }
}

import HttpError from './httpError';

export default class NotFoundError extends HttpError {
    constructor(message) {
        super(message, 404, 'Not Found');
    }
}

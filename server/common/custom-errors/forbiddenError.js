import HttpError from './httpError';

export default class ForbiddenError extends HttpError {
    constructor(message) {
        super(message, 403, 'Forbidden');
    }
}

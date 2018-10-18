import HttpError from './httpError';

export default class ForbiddenError extends HttpError {
    constructor(message) {
        super(message, 401, 'Unauthorized');
    }
}

import { STATUS_CODES } from 'http';
import CustomError from './customError';

export default class HttpError extends CustomError {
    constructor(message, httpStatusCode, clientMessage) {
        super(message, clientMessage);
        this.message = message || STATUS_CODES[httpStatusCode];
        this.httpStatusCode = httpStatusCode;
        this.errorMessage = message;
    }
}

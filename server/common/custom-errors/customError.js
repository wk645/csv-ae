export default class CustomError extends Error {
    constructor(message, clientMessage) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

        this.name = this.constructor.name;
        this.message = message;
        this.clientMessage = clientMessage;
    }
}

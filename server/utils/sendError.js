
class sendError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode || 500;
        this.isOperational = true;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = sendError;


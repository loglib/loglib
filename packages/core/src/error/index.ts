class LogLibError extends Error {
    code: number;
    details?: any;

    constructor(message: string, code: number, details?: any) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}


export class GenericError extends LogLibError {
    constructor(message: string, details?: any) {
        super(message, 400, details);
    }
}

export { LogLibError }
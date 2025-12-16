class ApiError extends Error {
    constructor(
        message = "something went wrong", statusCode,
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
        this.errors = errors;
        this.data = null;
        this.message = message;
        this.success = false;

        if (stack) {
            this.stack = stack;
        }else {
            Error.captureStackTrace(this, this.constructor);
        }//explanation: if stack is provided, use it; otherwise, capture the current stack trace
    }   
}

export default ApiError;
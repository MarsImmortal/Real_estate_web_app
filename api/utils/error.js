export const errorHandler = (statusCode, message) => {
    cosnt error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
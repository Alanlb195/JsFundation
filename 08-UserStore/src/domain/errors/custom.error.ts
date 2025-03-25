export class CustomError extends Error {
    private constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message);
    }

    static badRequest(message: string) {
        return new CustomError(400, message);
    }

    static unauthorized(message: string) {
        return new CustomError(401, message);
    }

    static forbidden(message: string) {
        return new CustomError(403, message);
    }

    static notFound(message: string) {
        return new CustomError(404, message);
    }

    static methodNotAllowed(message: string) {
        return new CustomError(405, message);
    }

    static conflict(message: string) {
        return new CustomError(409, message);
    }

    static unprocessableEntity(message: string) {
        return new CustomError(422, message);
    }

    static internalServerError(message: string = "Internal Server Error") {
        return new CustomError(500, message);
    }

    static notImplemented(message: string = "Not Implemented") {
        return new CustomError(501, message);
    }

    static badGateway(message: string = "Bad Gateway") {
        return new CustomError(502, message);
    }

    static serviceUnavailable(message: string = "Service Unavailable") {
        return new CustomError(503, message);
    }

    static gatewayTimeout(message: string = "Gateway Timeout") {
        return new CustomError(504, message);
    }
}

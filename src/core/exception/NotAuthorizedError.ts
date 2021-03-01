export class NotAuthorizedError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "NotAuthorizedError";
        this.status = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
}
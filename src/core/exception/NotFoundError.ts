export class NotFoundError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
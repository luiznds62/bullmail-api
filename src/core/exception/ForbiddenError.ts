export class ForbiddenError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "ForbiddenError";
        this.status = 403;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
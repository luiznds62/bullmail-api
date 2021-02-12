export class BadRequestError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
        this.status = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
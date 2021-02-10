export class ValidationError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ValidationError";
        this.status = status;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
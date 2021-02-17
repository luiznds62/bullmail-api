import {validateSync} from "class-validator";
import {ValidationError} from "./exception/ValidationError";
import {HTTP_STATUS} from "../common/Constants";

export interface IEntity {
    _id: any;
    path?: string
}

export class BasicEntity implements IEntity {
    _id: any;
    path: string;
    creationDate: Date;

    constructor() {
        this.creationDate = new Date();
    }

    public static validate(model) {
        const errors = validateSync(model);
        if (errors.length !== 0) {
            throw new ValidationError(HTTP_STATUS.VALIDATION_ERROR, Object.values(errors[0].constraints)[0]);
        }
    }

    public beforePersist(model) {
    }

    public afterPersist(model) {

    }

    setId(_id: string): BasicEntity {
        this._id = _id;
        return this;
    }

    getId(): string {
        return this._id;
    }
}
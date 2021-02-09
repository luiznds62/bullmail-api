import {validateSync} from "class-validator";

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

    static validate(model) {
        const errors = validateSync(model);
        if (errors.length !== 0) {
            throw new Error(Object.values(errors[0].constraints)[0]);
        }
    }

    getId() {
        return this._id;
    }
}
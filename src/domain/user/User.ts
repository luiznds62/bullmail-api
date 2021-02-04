import {BasicEntity} from "../../common/BasicEntity";

class User extends BasicEntity{
    static path: Object = {filename: 'users.db'};
    name: string;
    email: string;
    password: string;

    constructor() {
        super();
    }
}

export {User};

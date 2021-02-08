import {BasicEntity} from "../../core/BasicEntity";
import {Result} from "../../common/Result";

interface UserProps {
    name: string;
    email: string;
    password: string;
}

class User extends BasicEntity {
    static path: Object = {filename: 'users.db'};
    name: string;
    email: string;
    password: string;

    private constructor(props: UserProps) {
        super();

        if (props) {
            this.name = props.name;
            this.email = props.email;
            this.password = this.password;
        }
    }

    getName = ()  : string => {
        return this.name;
    }

    getEmail = ()  : string => {
        return this.email;
    }

    getPassword = ()  : string => {
        return this.password;
    }

    public static create(props: UserProps) {
        const user = new User({...props});

        return Result.ok<User>(user);
    }
}

export {User};

import {BasicEntity, IEntity} from "../../core/BasicEntity";
import {Result} from "../../common/Result";
import {IsDefined, IsEmail, Length} from "class-validator";

interface UserProps extends IEntity {
    name: string;
    email: string;
    password: string;
}

class User extends BasicEntity {
    static path: Object = {filename: 'users.db'};

    @IsDefined()
    @Length(5, 30)
    name: string;

    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @Length(10, 20)
    password: string;

    private constructor(props: UserProps) {
        super();
        if (props) {
            this._id = props._id;
            this.name = props.name;
            this.email = props.email;
            this.password = this.password;
        }
    }

    getName = (): string => {
        return this.name;
    }

    getEmail = (): string => {
        return this.email;
    }

    getPassword = (): string => {
        return this.password;
    }

    public static create(props: UserProps): Result<User> {
        const user = new User({...props});
        this.validate(user);

        return Result.ok<User>(user);
    }
}

export {User};

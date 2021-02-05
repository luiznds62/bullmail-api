import {Mapper} from "../../core/Mapper";
import {User} from "../../domain/user/User";

export interface UserDto {
    name: string;
    email: string;
    password: string;
}

export class UserMap extends Mapper<User> {

    public static toDomain(raw: any): User {
        const userOrError = User.create({
            name: raw.name,
            email: raw.email,
            password: raw.password
        });

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toPersistence(user: User): any {
        return {
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword()
        }
    }

    public static toDTO(user: User): UserDto {
        return {
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword()
        }
    }
}
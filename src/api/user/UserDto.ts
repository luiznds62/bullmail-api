import {Mapper} from "../../core/Mapper";
import {User} from "../../domain/user/User";

export interface UserDto {
    name: string;
    email: string;
    password: string;
}

export class UserMap extends Mapper<User> {
    toDomain(raw: any): User {
        const userOrError = User.create({
            name: raw.name,
            email: raw.email,
            password: raw.password
        });

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    toDTO(t: User) {
        return {
            name: t.getName(),
            email: t.getEmail(),
            password: t.getPassword()
        }
    }

    toPersistence(t: User): UserDto {
        return this.toDomain(t);
    }

}
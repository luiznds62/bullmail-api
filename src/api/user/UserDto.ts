import 'reflect-metadata';
import { Mapper } from '../../core/Mapper';
import { User } from '../../domain/user/User';

export interface UserDto {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export class UserMap extends Mapper<User> {
  toDomain(raw: any): Promise<User> {
    return User.create({
      _id: raw._id,
      name: raw.name,
      email: raw.email,
      password: raw.password
    })
      .then((result) => {
        return result.isSuccess ? result.getValue() : null;
      })
      .catch((error) => {
        throw error;
      });
  }

  toDTO(t: User): UserDto {
    return {
      _id: t.getId(),
      name: t.getName(),
      email: t.getEmail(),
      password: t.getPassword()
    };
  }
}

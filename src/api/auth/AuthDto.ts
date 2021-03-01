import 'reflect-metadata';
import { Mapper } from '../../core/Mapper';

export interface AuthDto {
  email: string;
  password: string;
}

export class AuthMap extends Mapper<any> {
  toDomain(raw: any): any {
    return {
      email: raw.email,
      password: raw.password
    };
  }

  toDTO(t: any): AuthDto {
    return {
      email: t.getEmail(),
      password: t.getPassword()
    };
  }
}

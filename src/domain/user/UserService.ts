import { User } from './User';
import { UserRepository } from '../user/UserRepository';
import { BasicService } from '../../core/BasicService';
import bcrypt from 'bcryptjs';

export class UserService extends BasicService<UserRepository, User> {
  constructor() {
    super(new UserRepository());
  }

  findByEmail(email: string): Promise<User> {
    return this.findOne({ email: email });
  }

  isPasswordMatch(password, hash): Boolean {
    return bcrypt.compareSync(password, hash);
  }
}

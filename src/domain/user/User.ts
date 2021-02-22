import 'reflect-metadata';
import bcrypt from 'bcryptjs';
import { BasicEntity, IEntity } from '../../core/BasicEntity';
import { Result } from '../../common/Result';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';
import { BCRYPT } from '../../common/Constants';
import { logger } from '../../common/Logger';
import { IsUserAlreadyExist } from '../../core/validators/IsUserAlreadyExistConstraint';

interface UserProps extends IEntity {
  name: string;
  email: string;
  password: string;
}

class User extends BasicEntity {
  static path: Object = { filename: 'users.db' };

  @IsDefined()
  @Length(5, 30)
  private name: string;

  @IsDefined()
  @IsEmail()
  @IsUserAlreadyExist({
    message: 'E-mail $value is already in use',
  })
  private email: string;

  @IsDefined()
  @IsString()
  @Length(6, 20)
  private password: string;

  private constructor(props: UserProps) {
    super();
    if (props) {
      if (this.hasId(props)) {
        this.setId(props._id);
      }
      this.setName(props.name);
      this.setEmail(props.email);
      this.setPassword(props.password);
    }
  }

  hasId(props) {
    return Object.keys(props).includes('_id');
  }

  setName = (name: string): User => {
    this.name = name;
    return this;
  };

  getName = (): string => {
    return this.name;
  };

  setEmail = (email: string): User => {
    this.email = email;
    return this;
  };

  getEmail = (): string => {
    return this.email;
  };

  setPassword = (password: string): User => {
    this.password = password;
    return this;
  };

  getPassword = (): string => {
    return this.password;
  };

  beforePersist() {
    try {
      this.password = bcrypt.hashSync(this.password, BCRYPT.SALTED_ROUND);
    } catch (e) {
      logger.error(e);
    }
  }

  public static async create(props: UserProps) {
    const user = new User({ ...props });

    try {
      return Result.ok<User>(await (<User>(<unknown>this.validate(user))));
    } catch (error) {
      throw error;
    }
  }
}

export { User };

import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Inject } from 'typescript-ioc';
import { UserService } from '../../domain/user/UserService';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {

  private userService: UserService = new UserService();

  async validate(email: any, args: ValidationArguments) {
    const user = await this.userService.findByEmail(email);
    if (user && user.getEmail() === email) {
      return false;
    }

    return true;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}

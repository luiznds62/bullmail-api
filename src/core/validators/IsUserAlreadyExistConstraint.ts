import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {UserService} from "../../domain/user/UserService";

@ValidatorConstraint({async: true})
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(email: any, args: ValidationArguments) {
        const userService = new UserService();
        const user = await userService.findByEmail(email);
        return user ? false : true;
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
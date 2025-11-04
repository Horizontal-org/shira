import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotEmpty',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            value.trim().length > 0
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be empty`;
        },
      },
    });
  };
}

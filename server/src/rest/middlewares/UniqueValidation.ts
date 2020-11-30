import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getManager, getRepository, Not } from 'typeorm';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: any) {
        const entity = args.object[`class_entity_${args.property}`];
        const req_id = args.object['id'] || -1
        return getManager()
            .count(entity, { [args.property]: value, id: Not(req_id) })
            .then((count) => count < 1);
    }
}

export function UniqueOnDatabase(entity: Function, validationOptions?: ValidationOptions) {
    validationOptions = { ...{ message: '$value already exists. Choose another.' }, ...validationOptions };
    return function (object: any, propertyName: string) {
        object[`class_entity_${propertyName}`] = entity;
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueOnDatabaseExistConstraint,
        });
    };
}
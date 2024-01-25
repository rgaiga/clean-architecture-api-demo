import {
    ValidationMiddleware,
    ValidationRule,
} from '@presentation/middlewares';

export const makeValidationMiddleware = (
    schema: Record<string, ValidationRule>,
): ValidationMiddleware<typeof schema> => new ValidationMiddleware(schema);

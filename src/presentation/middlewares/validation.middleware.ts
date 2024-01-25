import { ValidationError } from '@presentation/errors';
import { HttpBadRequest, HttpNoContent } from '@presentation/http-responses';
import { HttpRequest, Middleware } from '@presentation/http-interfaces';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationRule {
    type: ['number' | 'string' | 'email', string];
    required: [boolean, string];
    minValue?: [number, string];
    maxValue?: [number, string];
    minLength?: [number, string];
    maxLength?: [number, string];
}

export class ValidationMiddleware<T extends Record<string, unknown>>
    implements Middleware<T>
{
    constructor(private readonly schema: Record<string, ValidationRule>) {}

    handleRequest(httpRequest: HttpRequest<T>) {
        for (const [field, rules] of Object.entries(this.schema)) {
            const value = httpRequest.body[field];

            if (
                (rules.type[0] === 'number' && typeof value !== 'number') ||
                (rules.type[0] === 'string' && typeof value !== 'string') ||
                (rules.type[0] === 'email' &&
                    (typeof value !== 'string' ||
                        value.match(EMAIL_REGEX) === null))
            ) {
                return HttpBadRequest(new ValidationError(rules.type[1]));
            }

            if (rules.required[0] && (value === undefined || value === null)) {
                return HttpBadRequest(new ValidationError(rules.required[1]));
            }

            if (
                rules.minValue?.[0] &&
                (typeof value !== 'number' || value < rules.minValue[0])
            ) {
                return HttpBadRequest(new ValidationError(rules.minValue[1]));
            }

            if (
                rules.maxValue?.[0] &&
                (typeof value !== 'number' || value > rules.maxValue[0])
            ) {
                return HttpBadRequest(new ValidationError(rules.maxValue[1]));
            }

            if (
                rules.minLength?.[0] &&
                (typeof value !== 'string' || value.length < rules.minLength[0])
            ) {
                return HttpBadRequest(new ValidationError(rules.minLength[1]));
            }

            if (
                rules.maxLength?.[0] &&
                (typeof value !== 'string' || value.length > rules.maxLength[0])
            ) {
                return HttpBadRequest(new ValidationError(rules.maxLength[1]));
            }
        }

        return HttpNoContent();
    }
}

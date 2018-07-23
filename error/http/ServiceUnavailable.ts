import { IApiError } from './../../interface/IApiError';
import { BaseError } from './../BaseError';

export class ServiceNotAvailable extends BaseError {
    constructor(code: string, message: string, target: string, details: Array<IApiError>) {
        super(code, message, target, details);
        this.code = code;
        this.message = message;
        this.target = target;
        this.details = details;
    }
}
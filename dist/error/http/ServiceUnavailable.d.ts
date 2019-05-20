import { IApiError } from './../../interface/IApiError';
import { BaseError } from './../BaseError';
export declare class ServiceNotAvailable extends BaseError {
    constructor(code: string, message: string, target: string, details: Array<IApiError>);
}
//# sourceMappingURL=ServiceUnavailable.d.ts.map
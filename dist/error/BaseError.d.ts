import { IApiError } from "../interface/IApiError";
export declare class BaseError extends Error implements IApiError {
    code: string;
    message: string;
    target: string;
    details: Array<IApiError>;
    constructor(code: string, message: string, target: string, details: Array<IApiError>);
    addDetail(detail: IApiError): void;
    addDetails(details: Array<IApiError>): void;
}
//# sourceMappingURL=BaseError.d.ts.map
import {IApiError} from "../interface/IApiError";

export class BaseError extends Error implements IApiError {
    code: string;
    message: string;
    target: string;
    details: Array<IApiError>;
    constructor(code: string, message: string, target: string, details: Array<IApiError>) {

        super();
        this.code = code;
        this.message = message;
        this.target = target;
        this.details = details;
    }

    public addDetail(detail: IApiError): void {
        this.details.push(detail);
    }

    public addDetails(details: Array<IApiError>): void {
        this.details.push(...details);
    }
}
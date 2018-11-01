import { BaseError } from "../BaseError";
import { IApiError } from "../../interface/IApiError";

export class NotFound extends BaseError {
    constructor(code: string, message: string, target: string, details: Array<IApiError>) {
        super(code, message, target, details);
        this.code = code;
        this.message = message;
        this.target = target;
        this.details = details;
    }
}


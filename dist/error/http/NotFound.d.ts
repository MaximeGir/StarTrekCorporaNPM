import { BaseError } from "../BaseError";
import { IApiError } from "../../interface/IApiError";
export declare class NotFound extends BaseError {
    constructor(code: string, message: string, target: string, details: Array<IApiError>);
}
//# sourceMappingURL=NotFound.d.ts.map
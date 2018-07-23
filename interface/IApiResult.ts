import { IApiError } from "./IApiError";

export interface IApiResult<T> {
    /**
     * The uuid of that particular result
     */
    id?: string;

    /**
     * The actual data returned by the api
     */
    data?: Array<T>;

    /**
     * UTC Time at which the request took place
     */
    timestamp?: string;

    /**
     * List all errors that occured, if any
     */
    errors?: Array<IApiError>;
}
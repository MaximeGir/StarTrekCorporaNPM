export interface IApiError {
    /**
     * Error code, application specific
     */
    code?: string;

    /**
     * Error message to deliver
     */
    message?: string;

    /**
     * The element that failed
     */
    target?: string;

    /**
     * Including sub-errors
     */
    details?: Array<IApiError>;

    /**
     * Add a detail
     */
    addDetail(detail: IApiError): void;

    /**
     * Add details
     */
    addDetails(details: Array<IApiError>): void;
}
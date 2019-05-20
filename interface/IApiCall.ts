import { IApiResult } from "./IApiResult";

export interface IApiCall<T> {
  apiCall(path: string, args?: (string | number)[]): Promise<IApiResult<T>>;
}
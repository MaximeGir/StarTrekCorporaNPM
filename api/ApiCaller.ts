import * as superagent from 'superagent';
import { IApiCall } from "../interface/IApiCall";
import { configs } from './../config/configs';
import { IApiResult } from './../interface/IApiResult';
import uuid = require('uuid');

export class ApiCaller<T> implements IApiCall<T> {

  private readonly headers: any = {
    Authorization: configs.api.key
  }

  public async apiCall(path: string): Promise<IApiResult<T>> {

    let apiResult: IApiResult<T> = {
      id: uuid(),
      data: null,
      timestamp: (new Date()).toISOString(),
      errors: null
    };

    const url: string = `${configs.api_url}${configs.api.path}${path}`;
    let response = await superagent.get(url).set(this.headers).send();

    response.error ?
      apiResult.errors = response.errors :
      apiResult.data = response.body;

    return apiResult;
  }
}
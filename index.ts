import {IStarTrekCorpora} from "./interface/IStarTrekCorpora";
import {IDialog} from "./interface/IDialog";
import {IApiResult} from "./interface/IApiResult";
import {NotFound as NotFoundError} from "./error/http/NotFound";
import {NotIMplementedYet as NotImplementedYetError} from "./error/api/NotImplementedYet";
import {ErrorCode} from "./error/ErrorCode";
import {ErrorMessage} from "./error/ErrorMessage";
import * as configs from "./config/configs";
import * as request from "request-promise-native";
import {IPlanet} from "./interface/IPlanet";
import uuid = require("uuid");

export class StarTrek implements IStarTrekCorpora {
    private api_url;

    constructor() {
        this.configure(configs.configs.api_url);
    }

    private async configure(api_url: string): Promise<void> {
        this.api_url = api_url;
    }

    public async isConfigured(): Promise<boolean> {

        const options = {
            uri: configs.configs.api_url,
            resolveWithFullResponse: true
        };

        let response = await request.get(options);
        return response.statusCode === 200;
    }

    public async planets(): Promise<IApiResult<IPlanet>> {
        let options = {
            uri: configs.configs.api_url + "/planets",
            resolveWithFullResponse: false,
            json: true
        };

        let response: Array<IPlanet> = await request.get(options);

        let apiResult: IApiResult<IPlanet> = {
            id: uuid(),
            data: response,
            timestamp: (new Date()).toISOString(),
            errors: null
        };

        return apiResult;
    }

    public async dialogs(serieID: string | number, charID?: string | null): Promise<IApiResult<IDialog>> {
        try {
            if (serieID) {

                if (charID) {

                    return (await this.charDialogs(serieID, charID));

                }

                return (await this.serieDialogs(serieID));

            } else {

                throw new NotFoundError(ErrorCode.NOT_FOUND_ERROR, ErrorMessage.NOT_FOUND_ERROR + " : " + serieID, "dialogs", []);

            }

        } catch (error) {
            throw error;
        }

    }


    private async charDialogs(serieID: string | number, charID: string | null): Promise<IApiResult<IDialog>> {

        throw new NotImplementedYetError(ErrorCode.NOT_IMPLEMENTED_YET, ErrorMessage.NOT_IMPLEMENTED_YET, "dialogs", []);

    }


    private async serieDialogs(serieID: string | number): Promise<IApiResult<IDialog>> {

        throw new NotImplementedYetError(ErrorCode.NOT_IMPLEMENTED_YET, ErrorMessage.NOT_IMPLEMENTED_YET, "dialogs", []);

    }
}



import * as request from 'request-promise-native';
import uuid = require('uuid');

import * as configs from './config/configs';
import { NotIMplementedYet as NotImplementedYetError } from './error/api/NotImplementedYet';
import { ErrorCode } from './error/ErrorCode';
import { ErrorMessage } from './error/ErrorMessage';
import { NotFound as NotFoundError } from './error/http/NotFound';
import { ServiceNotAvailable as ServiceNotAvailableError } from './error/http/ServiceUnavailable';
import { IAlien } from './interface/IAlien';
import { IApiResult } from './interface/IApiResult';
import { IDialog } from './interface/IDialog';
import { IEpisode } from './interface/IEpisode';
import { IMeasurement } from './interface/IMeasurement';
import { IPersona } from './interface/IPersona';
import { IPlanet } from './interface/IPlanet';
import { IRank } from './interface/IRank';
import { ISerie } from './interface/ISerie';
import { ISpaceShip } from './interface/ISpaceShip';
import { IStarTrekCorpora } from './interface/IStarTrekCorpora';

export class StarTrek implements IStarTrekCorpora {
    private api_url;

    constructor() {
        this.configure(configs.configs.api_url);
    }

    private async configure(api_url: string): Promise<void> {
        try {

            this.api_url = api_url;
            await this.isConfigured();

        } catch (err) {
            console.error("Could not connect to Star Trek Corpora\n");
            console.error(err);
        }
    }

    public async isConfigured(): Promise<boolean> {
        try {

            const options = {
                uri: configs.configs.api_url + configs.configs.api.path,
                resolveWithFullResponse: true
            };

            let response = await request.get(options);
            return response.statusCode === 200;

        } catch (e) {

            throw new ServiceNotAvailableError(ErrorCode.SERVICE_NOT_AVAILABLE, ErrorMessage.SERVICE_NOT_AVAILABLE, "isConfigured", []);

        }
    }

    public async ranks(): Promise<IApiResult<IRank>> {
        let options = {
            uri: configs.configs.api_url + configs.configs.api.path + "/ranks",
            resolveWithFullResponse: false,
            json: true
        };

        let response: Array<IRank> = await request.get(options);

        let apiResult: IApiResult<IRank> = {
            id: uuid(),
            data: response,
            timestamp: (new Date()).toISOString(),
            errors: null
        };

        return apiResult;
    }

    public async spaceships(): Promise<IApiResult<ISpaceShip>> {
        let options = {
            uri: configs.configs.api_url + configs.configs.api.path + "/spaceships",
            resolveWithFullResponse: false,
            json: true
        };

        let response: Array<ISpaceShip> = await request.get(options);

        let apiResult: IApiResult<ISpaceShip> = {
            id: uuid(),
            data: response,
            timestamp: (new Date()).toISOString(),
            errors: null
        };

        return apiResult;

    }

    public async planets(): Promise<IApiResult<IPlanet>> {
        let options = {
            uri: configs.configs.api_url + configs.configs.api.path + "/planets",
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

    public async personas(): Promise<IApiResult<IPersona>> {
        let options = {
            uri: configs.configs.api_url + configs.configs.api.path + "/personas",
            resolveWithFullResponse: false,
            json: true
        };

        let response: Array<IPersona> = await request.get(options);

        let apiResult: IApiResult<IPersona> = {
            id: uuid(),
            data: response,
            timestamp: (new Date()).toISOString(),
            errors: null
        };

        return apiResult;
    }

    public async measurements(): Promise<IApiResult<IMeasurement>> {
        let options = {
            uri: configs.configs.api_url + configs.configs.api.path + "/measurements",
            resolveWithFullResponse: false,
            json: true
        };

        let response: Array<IMeasurement> = await request.get(options);

        let apiResult: IApiResult<IMeasurement> = {
            id: uuid(),
            data: response,
            timestamp: (new Date()).toISOString(),
            errors: null
        };

        return apiResult;
    }

    public async aliens(): Promise<IApiResult<IAlien>> {
        let options = {
            uri: configs.configs.api_url + configs.configs.api.path + "/aliens",
            resolveWithFullResponse: false,
            json: true
        };

        let response: Array<IAlien> = await request.get(options);

        let apiResult: IApiResult<IAlien> = {
            id: uuid(),
            data: response,
            timestamp: (new Date()).toISOString(),
            errors: null
        };

        return apiResult;
    }

    public async episodes(serie_id: number | string): Promise<IApiResult<IEpisode>> {
        try {

            let options = {
                uri: configs.configs.api_url + configs.configs.api.path + "/" + serie_id + "/episodes",
                resolveWithFullResponse: false,
                json: true
            };

            let apiResult: IApiResult<IEpisode> = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };

            let response: Array<IEpisode> = await request.get(options);

            apiResult.data = response;
            return apiResult;

        } catch (error) {
            console.log("ERROR! = " + error);
            throw error;
        }
    }

    public async episodeDialog(url: string): Promise<IApiResult<IDialog>> {
        try {

            let options = {
                uri: configs.configs.api_url + url,
                resolveWithFullResponse: false,
                json: true
            };

            let apiResult: IApiResult<IDialog> = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };

            let response: Array<IDialog> = await request.get(options);

            apiResult.data = response;
            return apiResult;

        } catch (error) {
            console.log("ERROR! = " + error);
            throw error;
        }
    }

    public async series(serie?: number | string): Promise<IApiResult<ISerie>> {
        let computed_uri: string = serie ? configs.configs.api_url + configs.configs.api.path + "/series" + "/" + serie : configs.configs.api_url + "/series";

        let options = {
            uri: computed_uri,
            resolveWithFullResponse: false,
            json: true
        };

        let response: Array<ISerie> = await request.get(options);

        let apiResult: IApiResult<ISerie> = {
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
        try {

            let options = {
                uri: configs.configs.api_url + configs.configs.api.path + "/dialogs/" + serieID,
                resolveWithFullResponse: false,
                json: true
            };

            let apiResult: IApiResult<IDialog> = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };

            let response: Array<IDialog> = await request.get(options);

            apiResult.data = response;
            return apiResult;

        } catch (error) {
            console.log("ERROR! = " + error);
            throw error;
        }
    }
}

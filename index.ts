import * as request from 'request-promise-native';
import uuid = require('uuid');

import { configs } from './config/configs';
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
    private readonly headers: any = {
        Authorization: configs.api.key
    }

    constructor() {
        this.configure(configs.api_url);
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
                uri: this.api_url + configs.api.path,
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
            uri: this.api_url + configs.api.path + "/ranks",
            resolveWithFullResponse: false,
            json: true,
            headers: this.headers
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
            uri: this.api_url + configs.api.path + "/spaceships",
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
            uri: this.api_url + configs.api.path + "/planets",
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
            uri: this.api_url + configs.api.path + "/personas",
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
            uri: this.api_url + configs.api.path + "/measurements",
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
            uri: this.api_url + configs.api.path + "/aliens",
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
                uri: this.api_url + configs.api.path + "/" + serie_id + "/episodes",
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

    public async series(serie?: number | string): Promise<IApiResult<ISerie>> {
        let computed_uri: string = serie ? this.api_url + configs.api.path + "/series" + "/" + serie : this.api_url + "/series";

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

    public async dialogs(serieID: string | number | null, charID?: string | null, episodeUrl?: string | null): Promise<IApiResult<IDialog>> {
        try {

            if (serieID) {

                if (charID) {

                    return (await this.charDialogs(serieID, charID));

                }

                return (await this.serieDialogs(serieID));

            } else if (episodeUrl) {

                return (await this.episodeDialog(episodeUrl));

            } else {

                throw new NotFoundError(ErrorCode.NOT_FOUND_ERROR, ErrorMessage.NOT_FOUND_ERROR + " : " + serieID, "dialogs", []);

            }

        } catch (error) {

            throw error;

        }

    }

    /**
     * Get dialogs from a particular serie for a particular character
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     * @param charID @see README.md for a list of the characters available for dialogs
     * @throws NotImplementedYetError 
     */
    private async charDialogs(serieID: string | number, charID: string | null): Promise<IApiResult<IDialog>> {
        throw new NotImplementedYetError(ErrorCode.NOT_IMPLEMENTED_YET, ErrorMessage.NOT_IMPLEMENTED_YET, "dialogs", []);
    }

    /**
     * Get dialogs from a whole serie
     * WARNING : Performance is bad
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     */
    private async serieDialogs(serieID: string | number): Promise<IApiResult<IDialog>> {
        try {

            let options = {
                uri: this.api_url + configs.api.path + "/dialogs/" + serieID,
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

    /**
     * Get particular episode object from its location (URL)
     * @param url the url from which dialogs are yielded
     * @return { Promise<IApiResult<IExplicitEpisode>> }
     */
    private async episodeDialog(url: string): Promise<IApiResult<IDialog>> {
        try {

            let options = {
                uri: this.api_url + url,
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

/**
 * Exporting all entities interfaces
 */
export * from "./interface/IAlien";
export * from "./interface/IApiError";
export * from "./interface/IApiResult";
export * from "./interface/IDialog";
export * from "./interface/IEpisode";
export * from "./interface/IMeasurement"
export * from "./interface/IPersona";
export * from "./interface/IPlanet";
export * from "./interface/IRank";
export * from "./interface/ISerie";
export * from "./interface/ISpaceShip";
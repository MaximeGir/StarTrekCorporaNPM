import * as superagent from 'superagent';
import { ApiCaller } from './api/ApiCaller';
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

            let response = await superagent.get(configs.api_url).send();
            if (response.error) {
                throw response.error;
            }
            else
                return response.statusCode === 200;

        } catch (e) {

            throw new ServiceNotAvailableError(ErrorCode.SERVICE_NOT_AVAILABLE, ErrorMessage.SERVICE_NOT_AVAILABLE, "isConfigured", []);

        }
    }

    public async ranks(): Promise<IApiResult<IRank>> {
        const caller: ApiCaller<IRank> = new ApiCaller<IRank>();
        return caller.apiCall("/ranks");
    }

    public async spaceships(): Promise<IApiResult<ISpaceShip>> {
        const caller: ApiCaller<ISpaceShip> = new ApiCaller<ISpaceShip>();
        return caller.apiCall("/spaceships");
    }

    public async planets(): Promise<IApiResult<IPlanet>> {
        const caller: ApiCaller<IPlanet> = new ApiCaller<IPlanet>();
        return caller.apiCall("/planets");
    }

    public async personas(): Promise<IApiResult<IPersona>> {
        const caller: ApiCaller<IPersona> = new ApiCaller<IPersona>();
        return caller.apiCall("/personas");
    }

    public async measurements(): Promise<IApiResult<IMeasurement>> {
        const caller: ApiCaller<IMeasurement> = new ApiCaller<IMeasurement>();
        return caller.apiCall("/measurements");
    }

    public async aliens(): Promise<IApiResult<IAlien>> {
        const caller: ApiCaller<IAlien> = new ApiCaller<IAlien>();
        return caller.apiCall("/aliens");
    }

    public async episodes(serie_id: number | string): Promise<IApiResult<IEpisode>> {
        const caller: ApiCaller<IEpisode> = new ApiCaller<IEpisode>();
        return caller.apiCall(`/${serie_id}/episodes`);
    }

    public async series(serie?: number | string): Promise<IApiResult<ISerie>> {
        const caller: ApiCaller<ISerie> = new ApiCaller<ISerie>();
        const uri: string = serie ? "/series" + "/" + serie : "/series";
        return caller.apiCall(uri);
    }

    public async dialogs(serieID: string | number | null, charID?: string | null, episodeUrl?: string | null): Promise<IApiResult<IDialog>> {

        let dialogs: IApiResult<IDialog> = null;

        if (charID) {
            dialogs = (await this.charDialogs(serieID, charID));
        } else if (episodeUrl) {
            dialogs = (await this.episodeDialog(episodeUrl));
        } else if (serieID) {
            dialogs = (await this.serieDialogs(serieID));
        }

        if (!serieID && !dialogs) {
            throw new NotFoundError(ErrorCode.NOT_FOUND_ERROR, ErrorMessage.NOT_FOUND_ERROR + " : " + serieID, "dialogs", []);
        }
        return dialogs;
    }

    /**
     * Get dialogs from a particular serie for a particular character
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     * @param charID @see README.md for a list of the characters available for dialogs
     * @throws NotImplementedYetError 
     */
    private async charDialogs(serieID: string | number, charID: string | null): Promise<IApiResult<IDialog>> {
        throw new NotImplementedYetError(
            ErrorCode.NOT_IMPLEMENTED_YET,
            ErrorMessage.NOT_IMPLEMENTED_YET,
            "dialogs",
            []
        );
    }

    /**
     * Get dialogs from a whole serie
     * WARNING : Performance is bad
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     */
    private async serieDialogs(serieID: string | number): Promise<IApiResult<IDialog>> {
        const caller: ApiCaller<IDialog> = new ApiCaller<IDialog>();
        return caller.apiCall("/dialogs/" + serieID);
    }

    /**
     * Get particular episode object from its location (URL)
     * @param url the url from which dialogs are yielded
     * @return { Promise<IApiResult<IExplicitEpisode>> }
     */
    private async episodeDialog(url: string): Promise<IApiResult<IDialog>> {
        const caller: ApiCaller<IDialog> = new ApiCaller<IDialog>();
        return caller.apiCall(url);
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
export * from "./interface/IMeasurement";
export * from "./interface/IPersona";
export * from "./interface/IPlanet";
export * from "./interface/IRank";
export * from "./interface/ISerie";
export * from "./interface/ISpaceShip";

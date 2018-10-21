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
export declare class StarTrek implements IStarTrekCorpora {
    private api_url;
    constructor();
    private configure;
    isConfigured(): Promise<boolean>;
    ranks(): Promise<IApiResult<IRank>>;
    spaceships(): Promise<IApiResult<ISpaceShip>>;
    planets(): Promise<IApiResult<IPlanet>>;
    personas(): Promise<IApiResult<IPersona>>;
    measurements(): Promise<IApiResult<IMeasurement>>;
    aliens(): Promise<IApiResult<IAlien>>;
    episodes(serie_id: number | string): Promise<IApiResult<IEpisode>>;
    series(serie?: number | string): Promise<IApiResult<ISerie>>;
    dialogs(serieID: string | number | null, charID?: string | null, episodeUrl?: string | null): Promise<IApiResult<IDialog>>;
    /**
     * Get dialogs from a particular serie for a particular character
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     * @param charID @see README.md for a list of the characters available for dialogs
     * @throws NotImplementedYetError
     */
    private charDialogs;
    /**
     * Get dialogs from a whole serie
     * WARNING : Performance is bad
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     */
    private serieDialogs;
    /**
     * Get particular episode object from its location (URL)
     * @param url the url from which dialogs are yielded
     * @return { Promise<IApiResult<IExplicitEpisode>> }
     */
    private episodeDialog;
}
//# sourceMappingURL=index.d.ts.map
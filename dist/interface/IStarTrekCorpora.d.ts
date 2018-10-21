import { IAlien } from './IAlien';
import { IApiResult } from './IApiResult';
import { IDialog } from './IDialog';
import { IEpisode } from './IEpisode';
import { IMeasurement } from './IMeasurement';
import { IPersona } from './IPersona';
import { IPlanet } from './IPlanet';
import { IRank } from './IRank';
import { ISerie } from './ISerie';
import { ISpaceShip } from './ISpaceShip';
export interface IStarTrekCorpora {
    /**
     * Get Spaceships, including shuttles
     * @return { Promise<IApiResult<ISpaceShip>> }
     */
    spaceships(): Promise<IApiResult<ISpaceShip>>;
    /**
     * Get dialogs from a particular serie, for an (optional) character
     * @param {string | number} serieID
     * @param {string} charID
     * @param {number} limit
     * @returns {Promise<IApiResult<IDialog>>}
     */
    dialogs(serieID: string | number, charID?: string): Promise<IApiResult<IDialog>>;
    /**
     *  Get all planets from the star trek universe
     *  @return { Promise<IApiResult<IPlanet>> }
     */
    planets(): Promise<IApiResult<IPlanet>>;
    /**
     * Get all personas from the star trek universe
     * @return { Promise<IApiResult<IPersona>> }
     */
    personas(): Promise<IApiResult<IPersona>>;
    /**
     * Get all measurements from the star trek universe
     * @return { Promise<IApiResult<IMeasurement>> }
     */
    measurements(): Promise<IApiResult<IMeasurement>>;
    /**
     * Get all aliens from the star trek universe
     * @return { Promise<IApiResult<IAlien>> }
     */
    aliens(): Promise<IApiResult<IAlien>>;
    /**
     * Get all series
     * @return { Promise<IApiResult<ISerie>> }
     */
    series(serie?: number | string): Promise<IApiResult<ISerie>>;
    /**
     * Get all episodes object from particular serie
     * @param serie_id either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     * @return { Promise<IApiResult<IEpisode>> }
     */
    episodes(serie_id: number | string): Promise<IApiResult<IEpisode>>;
    /**
     * Get ranks
     * @return { Promise<IApiResult<IRank>>}
     */
    ranks(): Promise<IApiResult<IRank>>;
}
//# sourceMappingURL=IStarTrekCorpora.d.ts.map
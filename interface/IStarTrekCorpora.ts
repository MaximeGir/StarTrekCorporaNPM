import { IApiResult } from "./IApiResult";
import { IDialog } from "./IDialog";
import { IPlanet } from "./IPlanet";
import { IPersona } from "./IPersona";

export interface IStarTrekCorpora {

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
}
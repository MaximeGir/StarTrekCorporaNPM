import {IApiResult} from "./IApiResult";
import {IDialog} from "./IDialog";

export interface IStarTrekCorpora {

    /**
     * Get dialogs from a particular serie, for an (optional) character
     * @param {string | number} serieID
     * @param {string} charID
     * @param {number} limit
     * @returns {Promise<IApiResult<IDialog>>}
     */
    dialogs(serieID: string | number, charID?: string): Promise<IApiResult<IDialog>>;
}
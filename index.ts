import {IStarTrekCorpora} from "./interface/IStarTrekCorpora";
import {IDialog} from "./interface/IDialog";
import {IApiResult} from "./interface/IApiResult";

export class StarTrek implements IStarTrekCorpora {
    public async dialogs(serieID: string | number, charID?: string | null): Promise<IApiResult<IDialog>> {
        throw new Error("Not implemented yet");
    }

}



import { IStarTrekCorpora } from "./interface/IStarTrekCorpora";
import { IDialog } from "./interface/IDialog";
import { IApiResult } from "./interface/IApiResult";
export declare class StarTrek implements IStarTrekCorpora {
    dialogs(serieID: string | number, charID?: string | null): Promise<IApiResult<IDialog>>;
}
//# sourceMappingURL=index.d.ts.map
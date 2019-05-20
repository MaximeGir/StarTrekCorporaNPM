"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiCaller_1 = require("./api/ApiCaller");
const superagent = __importStar(require("superagent"));
const configs_1 = require("./config/configs");
const NotImplementedYet_1 = require("./error/api/NotImplementedYet");
const ErrorCode_1 = require("./error/ErrorCode");
const ErrorMessage_1 = require("./error/ErrorMessage");
const NotFound_1 = require("./error/http/NotFound");
const ServiceUnavailable_1 = require("./error/http/ServiceUnavailable");
class StarTrek {
    constructor() {
        this.headers = {
            Authorization: configs_1.configs.api.key
        };
        this.configure(configs_1.configs.api_url);
    }
    configure(api_url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.api_url = api_url;
                yield this.isConfigured();
            }
            catch (err) {
                console.error("Could not connect to Star Trek Corpora\n");
                console.error(err);
            }
        });
    }
    isConfigured() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield superagent.get(configs_1.configs.api_url).send();
                if (response.error) {
                    throw response.error;
                }
                else
                    return response.statusCode === 200;
            }
            catch (e) {
                throw new ServiceUnavailable_1.ServiceNotAvailable(ErrorCode_1.ErrorCode.SERVICE_NOT_AVAILABLE, ErrorMessage_1.ErrorMessage.SERVICE_NOT_AVAILABLE, "isConfigured", []);
            }
        });
    }
    ranks() {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall("/ranks");
        });
    }
    spaceships() {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall("/spaceships");
        });
    }
    planets() {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall("/planets");
        });
    }
    personas() {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall("/personas");
        });
    }
    measurements() {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall("/measurements");
        });
    }
    aliens() {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall("/aliens");
        });
    }
    episodes(serie_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall(`/${serie_id}/episodes`);
        });
    }
    series(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            const uri = serie ? "/series" + "/" + serie : "/series";
            return caller.apiCall(uri);
        });
    }
    dialogs(serieID, charID, episodeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            let dialogs = null;
            if (charID) {
                dialogs = (yield this.charDialogs(serieID, charID));
            }
            else if (episodeUrl) {
                dialogs = (yield this.episodeDialog(episodeUrl));
            }
            else if (serieID) {
                dialogs = (yield this.serieDialogs(serieID));
            }
            if (!serieID && !dialogs) {
                throw new NotFound_1.NotFound(ErrorCode_1.ErrorCode.NOT_FOUND_ERROR, ErrorMessage_1.ErrorMessage.NOT_FOUND_ERROR + " : " + serieID, "dialogs", []);
            }
            return dialogs;
        });
    }
    /**
     * Get dialogs from a particular serie for a particular character
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     * @param charID @see README.md for a list of the characters available for dialogs
     * @throws NotImplementedYetError
     */
    charDialogs(serieID, charID) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new NotImplementedYet_1.NotIMplementedYet(ErrorCode_1.ErrorCode.NOT_IMPLEMENTED_YET, ErrorMessage_1.ErrorMessage.NOT_IMPLEMENTED_YET, "dialogs", []);
        });
    }
    /**
     * Get dialogs from a whole serie
     * WARNING : Performance is bad
     * @param serieID either the textual acronym or the number id of the serie you're looking into
     * "VOY","ENT","TNG","TOS","TAS","DIS" either in caps or tiny or 1,2,3,4,5,6 as number
     */
    serieDialogs(serieID) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall("/dialogs/" + serieID);
        });
    }
    /**
     * Get particular episode object from its location (URL)
     * @param url the url from which dialogs are yielded
     * @return { Promise<IApiResult<IExplicitEpisode>> }
     */
    episodeDialog(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const caller = new ApiCaller_1.ApiCaller();
            return caller.apiCall(url);
        });
    }
}
exports.StarTrek = StarTrek;
//# sourceMappingURL=index.js.map
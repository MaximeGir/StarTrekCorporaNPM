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
const superagent = __importStar(require("superagent"));
const uuid = require("uuid");
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
                let response = yield superagent.get(this.api_url + configs_1.configs.api.path).send();
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
            let apiResult = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };
            let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/ranks").set(this.headers).send();
            response.error ?
                apiResult.errors = response.errors :
                apiResult.data = response.body;
            return apiResult;
        });
    }
    spaceships() {
        return __awaiter(this, void 0, void 0, function* () {
            let apiResult = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };
            let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/spaceships").set(this.headers).send();
            response.error ?
                apiResult.errors = response.errors :
                apiResult.data = response.body;
            return apiResult;
        });
    }
    planets() {
        return __awaiter(this, void 0, void 0, function* () {
            let apiResult = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };
            let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/planets").set(this.headers).send();
            response.error ?
                apiResult.errors = response.errors :
                apiResult.data = response.body;
            return apiResult;
        });
    }
    personas() {
        return __awaiter(this, void 0, void 0, function* () {
            let apiResult = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };
            let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/personas").set(this.headers).send();
            response.error ?
                apiResult.errors = response.errors :
                apiResult.data = response.body;
            return apiResult;
        });
    }
    measurements() {
        return __awaiter(this, void 0, void 0, function* () {
            let apiResult = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };
            let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/measurements").set(this.headers).send();
            response.error ?
                apiResult.errors = response.errors :
                apiResult.data = response.body;
            return apiResult;
        });
    }
    aliens() {
        return __awaiter(this, void 0, void 0, function* () {
            let apiResult = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };
            let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/aliens").set(this.headers).send();
            response.error ?
                apiResult.errors = response.errors :
                apiResult.data = response.body;
            return apiResult;
        });
    }
    episodes(serie_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let apiResult = {
                    id: uuid(),
                    data: null,
                    timestamp: (new Date()).toISOString(),
                    errors: null
                };
                let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/" + serie_id + "/episodes").set(this.headers).send();
                response.error ?
                    apiResult.errors = response.errors :
                    apiResult.data = response.body;
                return apiResult;
            }
            catch (error) {
                throw error;
            }
        });
    }
    series(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            let computed_uri = serie ? this.api_url + configs_1.configs.api.path + "/series" + "/" + serie : this.api_url + "/series";
            let apiResult = {
                id: uuid(),
                data: null,
                timestamp: (new Date()).toISOString(),
                errors: null
            };
            let response = yield superagent.get(computed_uri).set(this.headers).send();
            response.error ?
                apiResult.errors = response.errors :
                apiResult.data = response.body;
            return apiResult;
        });
    }
    dialogs(serieID, charID, episodeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (serieID) {
                    if (charID) {
                        return (yield this.charDialogs(serieID, charID));
                    }
                    return (yield this.serieDialogs(serieID));
                }
                else if (episodeUrl) {
                    return (yield this.episodeDialog(episodeUrl));
                }
                else {
                    throw new NotFound_1.NotFound(ErrorCode_1.ErrorCode.NOT_FOUND_ERROR, ErrorMessage_1.ErrorMessage.NOT_FOUND_ERROR + " : " + serieID, "dialogs", []);
                }
            }
            catch (error) {
                throw error;
            }
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
            try {
                let apiResult = {
                    id: uuid(),
                    data: null,
                    timestamp: (new Date()).toISOString(),
                    errors: null
                };
                let response = yield superagent.get(this.api_url + configs_1.configs.api.path + "/dialogs/" + serieID).set(this.headers).send();
                response.error ?
                    apiResult.errors = response.errors :
                    apiResult.data = response.body;
                return apiResult;
            }
            catch (error) {
                console.log("ERROR! = " + error);
                throw error;
            }
        });
    }
    /**
     * Get particular episode object from its location (URL)
     * @param url the url from which dialogs are yielded
     * @return { Promise<IApiResult<IExplicitEpisode>> }
     */
    episodeDialog(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let apiResult = {
                    id: uuid(),
                    data: null,
                    timestamp: (new Date()).toISOString(),
                    errors: null
                };
                let response = yield superagent.get(this.api_url + url).set(this.headers).send();
                response.error ?
                    apiResult.errors = response.errors :
                    apiResult.data = response.body;
                return apiResult;
            }
            catch (error) {
                console.log("ERROR! = " + error);
                throw error;
            }
        });
    }
}
exports.StarTrek = StarTrek;
//# sourceMappingURL=index.js.map
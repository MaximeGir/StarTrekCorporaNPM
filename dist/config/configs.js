"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
class Configuration {
    constructor() {
        this.apiVersion = config_1.default.get('api.version');
        this.apiHost = config_1.default.get('api.host');
        this.apiPort = config_1.default.get('api.port');
        this.apiPath = config_1.default.get('api.path');
        this.apiScheme = config_1.default.get('api.scheme');
    }
    get api() {
        return {
            "version": this.apiVersion,
            "host": this.apiHost,
            "port": this.apiPort,
            "path": this.apiPath,
            "scheme": this.apiScheme
        };
    }
    get api_url() {
        return this.apiScheme + "://" + this.apiHost + ":" + this.apiPort;
    }
}
exports.Configuration = Configuration;
exports.configs = new Configuration();
//# sourceMappingURL=configs.js.map
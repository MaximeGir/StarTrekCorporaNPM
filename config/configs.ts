import config from "config";

export class Configuration {
    private readonly apiVersion: string;
    private readonly apiHost: string;
    private readonly apiPort: string;
    private readonly apiPath: string;
    private readonly apiScheme: string;

    constructor() {
        this.apiVersion = <string>config.get('api.version');
        this.apiHost = <string>config.get('api.host');
        this.apiPort = <string>config.get('api.port');
        this.apiPath = <string>config.get('api.path');
        this.apiScheme = <string>config.get('api.scheme');
    }

    get api(): any {
        return {
            "version": this.apiVersion,
            "host": this.apiHost,
            "port": this.apiPort,
            "path": this.apiPath,
            "scheme": this.apiScheme
        }
    }
}

export let configs: Configuration = new Configuration();
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import config from "config";

export class Configuration {
    private readonly apiVersion: string;
    private readonly apiHost: string;
    private readonly apiPort: string;
    private readonly apiPath: string;
    private readonly apiScheme: string;
    private readonly key: string;

    constructor() {
        try {
            this.apiVersion = <string>config.get('api.version');
            this.apiHost = <string>config.get('api.host');
            this.apiPort = <string>config.get('api.port');
            this.apiPath = <string>config.get('api.path');
            this.apiScheme = <string>config.get('api.scheme');
            this.key = <string>config.get('api.key');
        } catch (err) {

            this.apiVersion = "1.0.0";
            this.apiHost = "startrekcorpora.com";
            this.apiPort = "5000";
            this.apiPath = "/api/v1";
            this.apiScheme = "http";
            this.key = "secret_key";
        }
    }

    get api(): any {
        return {
            "version": this.apiVersion,
            "host": this.apiHost,
            "port": this.apiPort,
            "path": this.apiPath,
            "scheme": this.apiScheme,
            "key": this.key
        }
    }

    get api_url(): string {
        return this.apiScheme + "://" + this.apiHost + ":" + this.apiPort;
    }
}

export let configs: Configuration = new Configuration();
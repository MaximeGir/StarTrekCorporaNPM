import { IApiHandshake } from './../interface/IApiHandshake';
import { IApiKey } from './../interface/IApiKey';

const uuid = require('uuid/v4');

export class ApiKeyUtils {
    private key: IApiKey;

    public static async register(key: IApiKey): Promise<IApiHandshake> {


        const handshake: IApiHandshake = {
            id: 1,
            timestamps: new Date(),
            response: {
                apiKey: key,
                associatedEmail: "a@b.c"
            },
            error: null
        };

        return handshake;
    }
}
import { IApiKey } from './../interface/IApiKey';

export interface IApiHandshake {
    id: string;
    timestamps: Date;
    response: {
        apiKey: IApiKey;
        associatedEmail: string;
    }
}
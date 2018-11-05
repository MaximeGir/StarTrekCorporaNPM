import { IApiError } from './IApiError';
import { IApiKey } from './../interface/IApiKey';

export interface IApiHandshake {
    id: number;
    timestamps: Date;
    response: {
        apiKey: IApiKey;
        associatedEmail: string;
    },
    error: IApiError
}
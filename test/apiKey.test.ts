import { IApiHandshake } from './../interface/IApiHandshake';
import { assert } from 'chai';
import { IApiKey } from './../interface/IApiKey';
import { ApiKeyUtils } from './../utils/ApiKeyUtils';

let apiKey: IApiKey = {
    key: "some_invalid_key"
};

describe("Api key", () => {

    it("should return an object", async () => {
        let handshake: IApiHandshake = await ApiKeyUtils.register(apiKey);
        assert.isOk(handshake);
        assert.isObject(handshake);
    });

    it("should return a handshake", async () => {

        const apiKeyTemplate: IApiHandshake = {
            id: 1,
            timestamps: new Date(),
            response: {
                apiKey: apiKey,
                associatedEmail: "a@b.c"
            },
            error: null
        };

        let handshake: IApiHandshake = await ApiKeyUtils.register(apiKey);
        assert.hasAllDeepKeys(handshake, apiKeyTemplate);
    });

    it("should produce a uuid", async () => {

        const handshake: IApiHandshake = await ApiKeyUtils.register(apiKey);

        assert.isOk(handshake.id);
        assert.isNumber(handshake.id);

    });

    it("should produce a 'current' timestamp", async () => {

        const handshake: IApiHandshake = await ApiKeyUtils.register(apiKey);

        const then: Date = handshake.timestamps;
        const now: Date = new Date();

        assert.exists(handshake.timestamps);
        assert.isTrue(now >= then);
    });

    it("should contains the user email", async () => {

        const handshake: IApiHandshake = await ApiKeyUtils.register(apiKey);

        assert.exists(handshake.response.associatedEmail);
        assert.isString(handshake.response.associatedEmail);
        assert.isTrue(handshake.response.associatedEmail.includes("@"));
        assert.isTrue(handshake.response.associatedEmail.includes("."));
    });

});


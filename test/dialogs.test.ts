import { expect } from 'chai';
import nock from 'nock';

import { StarTrek } from '..';
import * as configs from '../config/configs';
import { ErrorCode } from '../error/ErrorCode';
import { ErrorMessage } from '../error/ErrorMessage';


let instance: StarTrek;

before(async () => {

    instance = new StarTrek();

});

describe('Connect to the api when instanciated', () => {

    it("should be configured", async () => {

        nock('http://localhost:5000', { "allowUnmocked": true })
            .get('/api/v1')
            .reply(200);

        expect(await instance.isConfigured()).to.equal(true);

    });
});

describe('dialogs function tests', () => {

    it('should throw not found error', async () => {

        let hasThrown: boolean = false;

        try {

            await instance.dialogs("", "");

        } catch (error) {

            expect(error).to.be.an.instanceof(Error);
            expect(error.code).to.equal(ErrorCode.NOT_FOUND_ERROR);
            expect(error.message).to.contain(ErrorMessage.NOT_FOUND_ERROR);

            hasThrown = true;

        }

        expect(hasThrown).to.equal(true);

    });

    it('should throw not implemented yet error', async () => {

        let hasThrown: boolean = false;

        try {

            await instance.dialogs("VOY", "JANEWAY");

        } catch (error) {

            expect(error).to.be.an.instanceof(Error);
            expect(error.code).to.equal(ErrorCode.NOT_IMPLEMENTED_YET);
            expect(error.message).to.contain(ErrorMessage.NOT_IMPLEMENTED_YET);
            hasThrown = true;

        }

        expect(hasThrown).to.equal(true);

    });


});

describe("configuration tests", () => {

    it('should have a valid configuration', () => {

        expect(configs).to.not.equal(undefined);
        expect(configs).to.not.equal(null);

    });

    it("should have an api attribute", () => {

        expect(configs.configs.api).to.not.equal(undefined);
        expect(configs.configs.api).to.not.equal(null);

    });

    it("should have all the api attributes", () => {

        expect(configs.configs.api).to.deep.include({ version: "1.0.0" });
        expect(configs.configs.api).to.deep.include({ host: "localhost" });
        expect(configs.configs.api).to.deep.include({ port: 5000 });
        expect(configs.configs.api).to.deep.include({ scheme: "http" });
        expect(configs.configs.api).to.deep.include({ path: "/api/v1" });

    });

    it("should build proper api-url", () => {

        expect(configs.configs.api_url).to.equal("http://localhost:5000/api/v1");

    });
});
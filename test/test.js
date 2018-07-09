'use strict';

var expect = require('chai').expect;
var stc = require('../dist/index.js').StarTrek;
var configs = require('../dist/config/configs.js');

describe('dialogs function tests', () => {
    it('should throw not implemented error', () => {
        var hasThrown = false;

        try {
            stc().dialogs();
        } catch (error) {
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
        expect(configs.configs.api).to.deep.include({version: "1.0.0"});
        expect(configs.configs.api).to.deep.include({host: "startrekcorpora.com"});
        expect(configs.configs.api).to.deep.include({port: 5000});
        expect(configs.configs.api).to.deep.include({scheme: "http"});
        expect(configs.configs.api).to.deep.include({path: "/api/v1"});
    });
});
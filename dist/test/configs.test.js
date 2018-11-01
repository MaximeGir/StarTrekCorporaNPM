"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const configs_1 = require("./../config/configs");
describe("configuration tests", () => {
    it('should have a valid configuration', () => {
        chai_1.expect(configs_1.configs).to.not.equal(undefined);
        chai_1.expect(configs_1.configs).to.not.equal(null);
    });
    it("should have an api attribute", () => {
        chai_1.expect(configs_1.configs.api).to.not.equal(undefined);
        chai_1.expect(configs_1.configs.api).to.not.equal(null);
    });
    it("should have all the api attributes", () => {
        if (process.env.NODE_ENV === "production") {
            chai_1.expect(configs_1.configs.api).to.deep.include({ host: "startrekcorpora.com" });
        }
        else if (process.env.NODE_ENV === "development") {
            chai_1.expect(configs_1.configs.api).to.deep.include({ host: "localhost" });
        }
        chai_1.expect(configs_1.configs.api).to.deep.include({ version: "1.0.0" });
        chai_1.expect(configs_1.configs.api).to.deep.include({ port: '5000' });
        chai_1.expect(configs_1.configs.api).to.deep.include({ scheme: "http" });
        chai_1.expect(configs_1.configs.api).to.deep.include({ path: "/api/v1" });
    });
    it("should build proper api-url", () => {
        if (process.env.NODE_ENV === "production") {
            chai_1.expect(configs_1.configs.api_url).to.equal("http://startrekcorpora.com:5000");
        }
        else if (process.env.NODE_ENV === "development") {
            chai_1.expect(configs_1.configs.api_url).to.equal("http://localhost:5000");
        }
    });
});
//# sourceMappingURL=configs.test.js.map
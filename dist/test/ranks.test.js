"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("./../config/configs");
const chai_1 = require("chai");
const index_1 = require("./../index");
const nock_1 = __importDefault(require("nock"));
let instance;
let ranks_mock;
before(() => __awaiter(this, void 0, void 0, function* () {
    instance = new index_1.StarTrek();
    ranks_mock = nock_1.default(configs_1.configs.api_url)
        .get('/api/v1/ranks')
        .twice()
        .reply(200, [{
            "id": 1,
            "name": "Chief of Security"
        },
        {
            "id": 2,
            "name": "Chief Engineer"
        },
        {
            "id": 3,
            "name": "Crewman"
        },
        {
            "id": 4,
            "name": "Ensign"
        },
        {
            "id": 5,
            "name": "Lieutenant"
        },
        {
            "id": 6,
            "name": "Lieutenant Commander"
        },
        {
            "id": 7,
            "name": "Commander"
        },
        {
            "id": 8,
            "name": "Captain"
        },
        {
            "id": 9,
            "name": "Admiral"
        }]);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("ranks tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let ranks = yield instance.ranks();
        chai_1.expect(ranks).to.haveOwnProperty("data");
        chai_1.expect(ranks).to.haveOwnProperty("timestamp");
        chai_1.expect(ranks).to.haveOwnProperty("errors");
        chai_1.expect(ranks).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let ranks = yield instance.ranks();
        chai_1.assert.typeOf(ranks.data, "array");
        chai_1.assert.isTrue(ranks.data.length > 0);
        chai_1.assert.isObject(ranks.data[0]);
        chai_1.assert.isTrue(ranks_mock.isDone());
    }));
});
//# sourceMappingURL=ranks.test.js.map
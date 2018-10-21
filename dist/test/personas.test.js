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
const nock_1 = __importDefault(require("nock"));
const __1 = require("..");
let instance;
let persona_nock;
before(() => __awaiter(this, void 0, void 0, function* () {
    instance = new __1.StarTrek();
    persona_nock = nock_1.default(configs_1.configs.api_url)
        .persist()
        .get('/api/v1/personas')
        .reply(200, [{
            "id": 1,
            "name": "Jonathan Archer",
            "planet_id": 232,
            "rank": "Captain",
            "species": 1,
            "vessel": "Enterprise NX-01"
        },
        {
            "id": 2,
            "name": "Ayala",
            "planet_id": 232,
            "rank": "Lieutenant, JG (provisional)",
            "species": 1,
            "vessel": "USS Voyager"
        },
        {
            "id": 3,
            "name": "Koloth",
            "planet_id": 423,
            "rank": "Dahar Master",
            "species": 157,
            "vessel": "n/a"
        },
        {
            "id": 4,
            "name": "Azan",
            "planet_id": 900,
            "rank": "Civilian",
            "species": 391,
            "vessel": "USS Voyager Passenger"
        }]);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("personas tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let personas = yield instance.personas();
        chai_1.expect(personas).to.haveOwnProperty("data");
        chai_1.expect(personas).to.haveOwnProperty("timestamp");
        chai_1.expect(personas).to.haveOwnProperty("errors");
        chai_1.expect(personas).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let personas = yield instance.personas();
        chai_1.assert.typeOf(personas.data, "array");
        chai_1.assert.isTrue(personas.data.length > 0);
        chai_1.assert.isObject(personas.data[0]);
        chai_1.assert.isTrue(persona_nock.isDone());
    }));
});
//# sourceMappingURL=personas.test.js.map
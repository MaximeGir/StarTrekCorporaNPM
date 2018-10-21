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
const lodash_1 = require("lodash");
const nock_1 = __importDefault(require("nock"));
const __1 = require("./..");
let randomizedSerieId;
let instance;
let episodes_mock;
before(() => __awaiter(this, void 0, void 0, function* () {
    randomizedSerieId = lodash_1.sample(["voy", "tng", "tos", "tas", "ent", "dis", "ds9", 1, 2, 3, 4, 5, 6, 7]);
    instance = new __1.StarTrek();
    episodes_mock = nock_1.default(configs_1.configs.api_url)
        .persist()
        .get('/api/v1/' + randomizedSerieId + "/episodes")
        .reply(200, [
        {
            "id": 548,
            "text": "/api/v1/dialogs/episode/548",
            "title": "caretaker"
        },
        {
            "id": 549,
            "text": "/api/v1/dialogs/episode/549",
            "title": "parallax"
        },
        {
            "id": 550,
            "text": "/api/v1/dialogs/episode/550",
            "title": "time and again"
        },
        {
            "id": 551,
            "text": "/api/v1/dialogs/episode/551",
            "title": "phage"
        },
        {
            "id": 552,
            "text": "/api/v1/dialogs/episode/552",
            "title": "the cloud"
        }
    ]);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("episodes tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let episodes = yield instance.episodes(randomizedSerieId);
        chai_1.expect(episodes).to.haveOwnProperty("data");
        chai_1.expect(episodes).to.haveOwnProperty("timestamp");
        chai_1.expect(episodes).to.haveOwnProperty("errors");
        chai_1.expect(episodes).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let episodes = yield instance.episodes(randomizedSerieId);
        chai_1.assert.typeOf(episodes.data, "array");
        chai_1.assert.isTrue(episodes.data.length > 0);
        chai_1.assert.isObject(episodes.data[0]);
        chai_1.assert.isTrue(episodes_mock.isDone());
    }));
    // TODO tests for errors returned by api
});
//# sourceMappingURL=episodes.test.js.map
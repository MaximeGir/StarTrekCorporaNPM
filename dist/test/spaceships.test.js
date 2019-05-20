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
let spaceship_mock;
before(() => __awaiter(this, void 0, void 0, function* () {
    instance = new index_1.StarTrek();
    spaceship_mock = nock_1.default(configs_1.configs.api_url)
        .get('/api/v1/spaceships')
        .reply(200, [
        {
            "description": "Commanded by Captain Elaine Mello. Assigned to defend Deep Space Nine for a short period of time after the Dominion War in the Deep Space Nine relaunch .",
            "id": 1,
            "name": "USS Gryphon",
            "registry": "NCC-65550",
            "ship_class": "Akira class"
        },
        {
            "description": "Commanded by Captain Elias Vaughn . Named in honour of the famous Starfleet captain . Destroyed in the defence of Federation worlds against the mass Borg invasion of 2381, resulting in the death of 31 crew members and Captain Vaughn being left brain dead .",
            "id": 2,
            "name": "USS James T Kirk",
            "registry": "NCC-91277",
            "ship_class": "Akira class"
        },
        {
            "description": "Participates in the Battle of Sector 001 .",
            "id": 3,
            "name": "USS Rabin",
            "registry": "NCC-63293",
            "ship_class": "Akira class"
        },
        {
            "description": "Participates in the Battle of Sector 001.",
            "id": 4,
            "name": "USS Thunderchild",
            "registry": "NCC-63549",
            "ship_class": "Akira class"
        }
    ]);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("spaceships tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let spaceships = yield instance.spaceships();
        chai_1.expect(spaceships).to.haveOwnProperty("data");
        chai_1.expect(spaceships).to.haveOwnProperty("timestamp");
        chai_1.expect(spaceships).to.haveOwnProperty("errors");
        chai_1.expect(spaceships).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let spaceships = yield instance.spaceships();
        chai_1.assert.typeOf(spaceships.data, "array");
        chai_1.assert.isTrue(spaceships.data.length > 0);
        chai_1.assert.isObject(spaceships.data[0]);
    }));
});
//# sourceMappingURL=spaceships.test.js.map
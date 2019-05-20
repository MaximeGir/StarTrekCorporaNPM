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
let planet_nock;
before(() => __awaiter(this, void 0, void 0, function* () {
    planet_nock = nock_1.default(configs_1.configs.api_url)
        .persist()
        .get('/api/v1/planets')
        .reply(200, [
        {
            "description": " Homeworld of the Aaamazzarite species.[1]",
            "id": 1,
            "name": "Aaamazzara "
        },
        {
            "description": " Homeworld of the humanoid Acamarians, who finally reunited the marauding Gatherers into their world's mainstream with Capt. Picard's help in 2366.[2]",
            "id": 2,
            "name": "Acamar III "
        },
        {
            "description": " Site of a conference supposedly attended by Lwaxana Troi before she changed her plans to visit Enterprise-D. This is likely a ruse by Deanna Troi to get Capt. Picard off-ship for a vacation.[3]",
            "id": 3,
            "name": "Achrady VII "
        },
        {
            "description": " Planet in Cardassian space and location of a weapons depot.[4]",
            "id": 4,
            "name": "Adarak Prime "
        },
        {
            "description": "Home of the Phylosians",
            "id": 5,
            "name": "Phylos"
        }
    ]);
    instance = new __1.StarTrek();
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("Planet test", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let planets = yield instance.planets();
        chai_1.expect(planets).to.haveOwnProperty("data");
        chai_1.expect(planets).to.haveOwnProperty("timestamp");
        chai_1.expect(planets).to.haveOwnProperty("errors");
        chai_1.expect(planets).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let planets = yield instance.planets();
        chai_1.assert.typeOf(planets.data, "array");
        chai_1.assert.isTrue(planets.data.length > 0);
        chai_1.assert.isObject(planets.data[0]);
        chai_1.assert.isTrue(planet_nock.isDone());
    }));
});
//# sourceMappingURL=planets.test.js.map
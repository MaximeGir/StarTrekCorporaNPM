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
let aliens_mock;
before(() => __awaiter(this, void 0, void 0, function* () {
    instance = new index_1.StarTrek();
    aliens_mock = nock_1.default(configs_1.configs.api_url)
        .persist()
        .get('/api/v1/aliens')
        .reply(200, [
        {
            "description": "Planet: Earth.",
            "id": 1,
            "name": "Human",
            "planet_id": 232
        },
        {
            "description": "Planet: Acamar III. The people of Acamar III finally forged peace a century ago after generations of bloody clan wars. One group of various clansmen who couldn't accept the new peace, the Gatherers, broke off to prey as marauders upon neighboring trade routes and outposts; they rejected amnesty until Captain Picard helped force the sides into talks and a truce circa stardate 43422. Humanoid in appearance, they have a distinguishing vertical crease in their forehead above the nose and an almost ornamental skin coloration on one cheek. Their blood is a rare iron-copper composite unique to them. Their science is advanced enough to download data to the U.S.S. Enterprise by subspace link. Income taxes and plenty of police bureaucracy are standard fare there.",
            "id": 2,
            "name": "Acamarian",
            "planet_id": 2
        },
        {
            "description": "Pre-industrial society encountered by the Enterprise NX-01.",
            "id": 3,
            "name": "Akaali",
            "planet_id": 2
        },
        {
            "description": "Advanced humanoid Delta Quadrant race with basic interstellar spaceflight, perhaps warp-capable. A dictatorship controls the planet, now dealing with an Open Sky group fighting to overthrow it.",
            "id": 4,
            "name": "Akritirians",
            "planet_id": 2
        },
        {
            "description": "Unspecified race that had a transport operating from Deep Space 4 to Caere on stardate 46731.5.",
            "id": 5,
            "name": "Al-Leyan",
            "planet_id": 2
        }
    ]);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("aliens tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let aliens = yield instance.aliens();
        chai_1.expect(aliens).to.haveOwnProperty("data");
        chai_1.expect(aliens).to.haveOwnProperty("timestamp");
        chai_1.expect(aliens).to.haveOwnProperty("errors");
        chai_1.expect(aliens).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let aliens = yield instance.aliens();
        chai_1.assert.typeOf(aliens.data, "array");
        chai_1.assert.isTrue(aliens.data.length > 0);
        chai_1.assert.isObject(aliens.data[0]);
    }));
});
//# sourceMappingURL=aliens.test.js.map
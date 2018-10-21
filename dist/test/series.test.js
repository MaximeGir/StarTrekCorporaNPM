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
const __1 = require("./..");
let instance;
let series_mock;
let series_with_id_mock;
before(() => __awaiter(this, void 0, void 0, function* () {
    instance = new __1.StarTrek();
    series_with_id_mock = nock_1.default(configs_1.configs.api_url)
        .persist()
        .filteringPath(function (path) {
        return '/api/v1/series/';
    })
        .get('/api/v1/series/')
        .reply(200, [
        {
            "acronym": "TOS",
            "end_year": 1969,
            "id": 1,
            "name": "Star Trek: The Original Series",
            "start_year": 1966
        }
    ]);
    series_mock = nock_1.default(configs_1.configs.api_url)
        .persist()
        .get('/api/v1/series')
        .reply(200, [
        {
            "acronym": "TOS",
            "end_year": 1969,
            "id": 1,
            "name": "Star Trek: The Original Series",
            "start_year": 1966
        },
        {
            "acronym": "TAS",
            "end_year": 1974,
            "id": 2,
            "name": "Star Trek: The Animated Series",
            "start_year": 1973
        },
        {
            "acronym": "TNG",
            "end_year": 1994,
            "id": 3,
            "name": "Star Trek: The Next Generation",
            "start_year": 1987
        },
        {
            "acronym": "VOY",
            "end_year": 2001,
            "id": 4,
            "name": "Star Trek: Voyager",
            "start_year": 1995
        },
        {
            "acronym": "DS9",
            "end_year": 1999,
            "id": 5,
            "name": "Star Trek: Deep Space Nine",
            "start_year": 1993
        },
        {
            "acronym": "ENT",
            "end_year": 2005,
            "id": 6,
            "name": "Star Trek: Enterprise",
            "start_year": 2001
        },
        {
            "acronym": "DIS",
            "end_year": 2017,
            "id": 7,
            "name": "Star Trek: Discovery",
            "start_year": 2017
        }
    ]);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("series tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let series = yield instance.series();
        chai_1.expect(series).to.haveOwnProperty("data");
        chai_1.expect(series).to.haveOwnProperty("timestamp");
        chai_1.expect(series).to.haveOwnProperty("errors");
        chai_1.expect(series).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let series = yield instance.series();
        chai_1.assert.typeOf(series.data, "array");
        chai_1.assert.isTrue(series.data.length > 0);
        chai_1.assert.isObject(series.data[0]);
    }));
});
describe("series with id tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let seriesList = ["tos", "tas", "tng", "voy", "ent", "ds9", "dis", 1, 2, 3, 4, 5, 6, 7];
        let series;
        for (let serie_name of seriesList) {
            series = yield instance.series(serie_name);
            chai_1.expect(series).to.haveOwnProperty("data");
            chai_1.expect(series).to.haveOwnProperty("timestamp");
            chai_1.expect(series).to.haveOwnProperty("errors");
            chai_1.expect(series).to.haveOwnProperty("id");
        }
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let seriesList = ["tos", "tas", "tng", "voy", "ent", "ds9", "dis", 1, 2, 3, 4, 5, 6, 7];
        let series;
        for (let serie_name of seriesList) {
            series = yield instance.series(serie_name);
            chai_1.assert.typeOf(series.data, "array");
            chai_1.assert.isTrue(series.data.length > 0);
            chai_1.assert.isObject(series.data[0]);
        }
    }));
});
//# sourceMappingURL=series.test.js.map
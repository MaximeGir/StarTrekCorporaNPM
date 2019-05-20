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
let measurements_nock;
before(() => __awaiter(this, void 0, void 0, function* () {
    instance = new index_1.StarTrek();
    measurements_nock = nock_1.default(configs_1.configs.api_url)
        .persist()
        .get('/api/v1/measurements')
        .reply(200, [{
            "id": 1,
            "name": "millimeter",
            "symbol": "mm"
        },
        {
            "id": 2,
            "name": "centimeter",
            "symbol": "cm"
        },
        {
            "id": 3,
            "name": "meter",
            "symbol": "m"
        },
        {
            "id": 4,
            "name": "kilometer",
            "symbol": "km"
        },
        {
            "id": 5,
            "name": "milligram",
            "symbol": "mg"
        },
        {
            "id": 6,
            "name": "gram",
            "symbol": "g"
        },
        {
            "id": 7,
            "name": "kilogram",
            "symbol": "kg"
        },
        {
            "id": 8,
            "name": "metric ton",
            "symbol": "t"
        },
        {
            "id": 9,
            "name": "second",
            "symbol": "s"
        },
        {
            "id": 10,
            "name": "degree Celsius",
            "symbol": "C"
        },
        {
            "id": 11,
            "name": "square meter",
            "symbol": "m2"
        },
        {
            "id": 12,
            "name": "hectare",
            "symbol": "ha"
        },
        {
            "id": 13,
            "name": "square kilometer",
            "symbol": "km2"
        },
        {
            "id": 14,
            "name": "milliliter",
            "symbol": "mL"
        },
        {
            "id": 15,
            "name": "cubic centimeter",
            "symbol": "cm3"
        },
        {
            "id": 16,
            "name": "liter",
            "symbol": "L"
        },
        {
            "id": 17,
            "name": "cubic meter",
            "symbol": "m3"
        },
        {
            "id": 18,
            "name": "meter per second",
            "symbol": "m/s"
        },
        {
            "id": 19,
            "name": "kilometer per hour",
            "symbol": "km/h"
        },
        {
            "id": 20,
            "name": "kilogram per cubic meter",
            "symbol": "kg/m3"
        },
        {
            "id": 21,
            "name": "newton",
            "symbol": "N"
        },
        {
            "id": 22,
            "name": "kilopascal",
            "symbol": "kPa"
        },
        {
            "id": 23,
            "name": "watt",
            "symbol": "W"
        },
        {
            "id": 24,
            "name": "kilowatt",
            "symbol": "kW"
        },
        {
            "id": 25,
            "name": "kilojoule",
            "symbol": "kJ"
        },
        {
            "id": 26,
            "name": "megajoule",
            "symbol": "MJ"
        },
        {
            "id": 27,
            "name": "kilowatt hour",
            "symbol": "kW/h"
        },
        {
            "id": 28,
            "name": "ampere",
            "symbol": "A"
        }]);
}));
after(() => __awaiter(this, void 0, void 0, function* () {
    nock_1.default.cleanAll();
}));
describe("measurements tests", () => {
    it("should have IApiResult format", () => __awaiter(this, void 0, void 0, function* () {
        let measurements = yield instance.measurements();
        chai_1.expect(measurements).to.haveOwnProperty("data");
        chai_1.expect(measurements).to.haveOwnProperty("timestamp");
        chai_1.expect(measurements).to.haveOwnProperty("errors");
        chai_1.expect(measurements).to.haveOwnProperty("id");
    }));
    it("should result be in json format", () => __awaiter(this, void 0, void 0, function* () {
        let measurements = yield instance.measurements();
        chai_1.assert.typeOf(measurements.data, "array");
        chai_1.assert.isTrue(measurements.data.length > 0);
        chai_1.assert.isObject(measurements.data[0]);
        chai_1.assert.isTrue(measurements_nock.isDone());
    }));
});
//# sourceMappingURL=measurements.test.js.map
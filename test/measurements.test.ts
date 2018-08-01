import { configs } from './../config/configs';
import { expect, assert } from 'chai';
import { StarTrek } from './../index';
import nock from 'nock';

let instance: StarTrek;
let measurements_nock;

before(async () => {

    instance = new StarTrek();

    measurements_nock = nock(configs.api_url)
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
});

after(async () => {

    nock.cleanAll();

});

describe("measurements tests", () => {

    it("should have IApiResult format", async () => {

        let measurements = await instance.measurements();

        expect(measurements).to.haveOwnProperty("data");
        expect(measurements).to.haveOwnProperty("timestamp");
        expect(measurements).to.haveOwnProperty("errors");
        expect(measurements).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let measurements = await instance.measurements();

        assert.typeOf(measurements.data, "array");
        assert.isTrue(measurements.data.length > 0);
        assert.isObject(measurements.data[0]);
        assert.isTrue(measurements_nock.isDone())

    });

});
import { configs } from './../config/configs';
import { assert, expect } from 'chai';
import { sample } from 'lodash';
import nock from 'nock';

import { StarTrek } from './..';

let instance: StarTrek;
let series_mock;
let series_with_id_mock;

before(async () => {

    instance = new StarTrek();

    series_with_id_mock = nock(configs.api_url)
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

    series_mock = nock(configs.api_url)
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
});

after(async () => {

    nock.cleanAll();

});

describe("series tests", () => {

    it("should have IApiResult format", async () => {

        let series = await instance.series();

        expect(series).to.haveOwnProperty("data");
        expect(series).to.haveOwnProperty("timestamp");
        expect(series).to.haveOwnProperty("errors");
        expect(series).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let series = await instance.series();

        assert.typeOf(series.data, "array");
        assert.isTrue(series.data.length > 0);
        assert.isObject(series.data[0]);

    });

});

describe("series with id tests", () => {

    it("should have IApiResult format", async () => {

        let seriesList: Array<any> = ["tos", "tas", "tng", "voy", "ent", "ds9", "dis", 1, 2, 3, 4, 5, 6, 7];
        let series;

        for (let serie_name of seriesList) {

            series = await instance.series(serie_name);

            expect(series).to.haveOwnProperty("data");
            expect(series).to.haveOwnProperty("timestamp");
            expect(series).to.haveOwnProperty("errors");
            expect(series).to.haveOwnProperty("id");

        }

    });

    it("should result be in json format", async () => {

        let seriesList: Array<any> = ["tos", "tas", "tng", "voy", "ent", "ds9", "dis", 1, 2, 3, 4, 5, 6, 7];
        let series;

        for (let serie_name of seriesList) {
            series = await instance.series(serie_name);

            assert.typeOf(series.data, "array");
            assert.isTrue(series.data.length > 0);
            assert.isObject(series.data[0]);

        }

    });

});
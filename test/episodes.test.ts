import { configs } from './../config/configs';
import { assert, expect } from 'chai';
import { sample } from 'lodash';
import nock from 'nock';

import { StarTrek } from './..';

let randomizedSerieId: string | number;
let instance: StarTrek;
let episodes_mock;

before(async () => {

    randomizedSerieId = sample(["voy", "tng", "tos", "tas", "ent", "dis", "ds9", 1, 2, 3, 4, 5, 6, 7]);

    instance = new StarTrek();

    episodes_mock = nock(configs.api_url)
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
});

after(async () => {

    nock.cleanAll();

});

describe("episodes tests", () => {

    it("should have IApiResult format", async () => {

        let episodes = await instance.episodes(randomizedSerieId);

        expect(episodes).to.haveOwnProperty("data");
        expect(episodes).to.haveOwnProperty("timestamp");
        expect(episodes).to.haveOwnProperty("errors");
        expect(episodes).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let episodes = await instance.episodes(randomizedSerieId);

        assert.typeOf(episodes.data, "array");
        assert.isTrue(episodes.data.length > 0);
        assert.isObject(episodes.data[0]);
        assert.isTrue(episodes_mock.isDone())

    });

    // TODO tests for errors returned by api
});
import { configs } from './../config/configs';
import { expect, assert } from 'chai';
import nock from 'nock';

import { StarTrek } from '..';

let instance: StarTrek;
let persona_nock;

before(async () => {

    instance = new StarTrek();

    persona_nock = nock(configs.api_url)
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

});

after(async () => {

    nock.cleanAll();

});

describe("personas tests", () => {

    it("should have IApiResult format", async () => {

        let personas = await instance.personas();

        expect(personas).to.haveOwnProperty("data");
        expect(personas).to.haveOwnProperty("timestamp");
        expect(personas).to.haveOwnProperty("errors");
        expect(personas).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let personas = await instance.personas();

        assert.typeOf(personas.data, "array");
        assert.isTrue(personas.data.length > 0);
        assert.isObject(personas.data[0]);
        assert.isTrue(persona_nock.isDone())

    });

});
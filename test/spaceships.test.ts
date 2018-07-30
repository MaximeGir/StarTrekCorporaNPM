import { configs } from './../config/configs';
import { expect, assert } from 'chai';
import { StarTrek } from './../index';
import nock from 'nock';

let instance: StarTrek;
let spaceship_mock;

before(async () => {

    instance = new StarTrek();

    spaceship_mock = nock(configs.api_url)
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
});

after(async () => {

    nock.cleanAll();

});

describe("spaceships tests", () => {

    it("should have IApiResult format", async () => {

        let spaceships = await instance.spaceships();

        expect(spaceships).to.haveOwnProperty("data");
        expect(spaceships).to.haveOwnProperty("timestamp");
        expect(spaceships).to.haveOwnProperty("errors");
        expect(spaceships).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let spaceships = await instance.spaceships();

        assert.typeOf(spaceships.data, "array");
        assert.isTrue(spaceships.data.length > 0);
        assert.isObject(spaceships.data[0]);
    });

});
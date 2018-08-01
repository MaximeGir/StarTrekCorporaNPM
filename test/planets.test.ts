import { configs } from './../config/configs';
import { assert, expect } from 'chai';
import nock from 'nock';

import { StarTrek } from '..';

let instance: StarTrek;
let planet_nock;

before(async () => {

    planet_nock = nock(configs.api_url)
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
            }]);

    instance = new StarTrek();

});

after(async () => {

    nock.cleanAll();

});

describe("Planet test", () => {

    it("should have IApiResult format", async () => {

        let planets = await instance.planets();

        expect(planets).to.haveOwnProperty("data");
        expect(planets).to.haveOwnProperty("timestamp");
        expect(planets).to.haveOwnProperty("errors");
        expect(planets).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let planets = await instance.planets();

        assert.typeOf(planets.data, "array");
        assert.isTrue(planets.data.length > 0);
        assert.isObject(planets.data[0]);
        assert.isTrue(planet_nock.isDone())

    });

});
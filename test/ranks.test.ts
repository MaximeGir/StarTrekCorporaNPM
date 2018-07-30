import { expect, assert } from 'chai';
import { StarTrek } from './../index';
import nock from 'nock';

let instance: StarTrek;
let ranks_mock;

before(async () => {

    instance = new StarTrek();

    ranks_mock = nock('http://localhost:5000')
        .persist()
        .get('/api/v1/ranks')
        .reply(200, [{
            "id": 1,
            "name": "Chief of Security"
        },
        {
            "id": 2,
            "name": "Chief Engineer"
        },
        {
            "id": 3,
            "name": "Crewman"
        },
        {
            "id": 4,
            "name": "Ensign"
        },
        {
            "id": 5,
            "name": "Lieutenant"
        },
        {
            "id": 6,
            "name": "Lieutenant Commander"
        },
        {
            "id": 7,
            "name": "Commander"
        },
        {
            "id": 8,
            "name": "Captain"
        },
        {
            "id": 9,
            "name": "Admiral"
        }]);
});

after(async () => {

    nock.cleanAll();

});

describe("ranks tests", () => {

    it("should have IApiResult format", async () => {

        let ranks = await instance.ranks();

        expect(ranks).to.haveOwnProperty("data");
        expect(ranks).to.haveOwnProperty("timestamp");
        expect(ranks).to.haveOwnProperty("errors");
        expect(ranks).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let ranks = await instance.ranks();

        assert.typeOf(ranks.data, "array");
        assert.isTrue(ranks.data.length > 0);
        assert.isObject(ranks.data[0]);
        assert.isTrue(ranks_mock.isDone())

    });

});
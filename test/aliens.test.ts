import { configs } from './../config/configs';
import { expect, assert } from 'chai';
import { StarTrek } from './../index';
import nock from 'nock';

let instance: StarTrek;
let aliens_mock;

before(async () => {

    instance = new StarTrek();

    aliens_mock = nock(configs.api_url)
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
});

after(async () => {

    nock.cleanAll();

});

describe("aliens tests", () => {

    it("should have IApiResult format", async () => {

        let aliens = await instance.aliens();

        expect(aliens).to.haveOwnProperty("data");
        expect(aliens).to.haveOwnProperty("timestamp");
        expect(aliens).to.haveOwnProperty("errors");
        expect(aliens).to.haveOwnProperty("id");

    });

    it("should result be in json format", async () => {

        let aliens = await instance.aliens();

        assert.typeOf(aliens.data, "array");
        assert.isTrue(aliens.data.length > 0);
        assert.isObject(aliens.data[0]);

    });

});
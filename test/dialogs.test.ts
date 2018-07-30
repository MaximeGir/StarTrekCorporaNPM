import { IDialog } from '../interface/IDialog';
import { expect, assert } from 'chai';
import nock from 'nock';

import { StarTrek } from '..';
import { ErrorCode } from '../error/ErrorCode';
import { ErrorMessage } from '../error/ErrorMessage';


let instance: StarTrek;
let voyager_mock: any;

before(async () => {

    instance = new StarTrek();
    voyager_mock = nock('http://localhost:5000', { "allowUnmocked": false })
        .persist()
        .get('/api/v1/dialogs/voy')
        .reply(200, [{
            "character_id": 14,
            "didascalis": {
                "didascalis": []
            },
            "episode_id": 548,
            "episode_title": "caretaker",
            "id": 197828,
            "room": {
                "rooms": []
            },
            "serie_id": 4,
            "speaker_name": "Chakotay",
            "text": " Be creative!\n"
        },
        {
            "character_id": 108,
            "didascalis": {
                "didascalis": []
            },
            "episode_id": 548,
            "episode_title": "caretaker",
            "id": 197915,
            "room": {
                "rooms": []
            },
            "serie_id": 4,
            "speaker_name": "Quark",
            "text": " You have one, I presume?\n"
        }]);
});

describe('Connect to the api when instanciated', () => {

    it("should be configured", async () => {

        nock('http://localhost:5000', { "allowUnmocked": true })
            .get('/api/v1')
            .reply(200);

        expect(await instance.isConfigured()).to.equal(true);

    });
});

describe('dialogs function tests', () => {

    it('should throw not found error', async () => {

        let hasThrown: boolean = false;

        try {

            await instance.dialogs("", "");

        } catch (error) {

            expect(error).to.be.an.instanceof(Error);
            expect(error.code).to.equal(ErrorCode.NOT_FOUND_ERROR);
            expect(error.message).to.contain(ErrorMessage.NOT_FOUND_ERROR);

            hasThrown = true;

        }

        expect(hasThrown).to.equal(true);

    });

    it('should throw not implemented yet error', async () => {

        let hasThrown: boolean = false;

        try {

            let error = await instance.dialogs("VOY", "JANEWAY");

        } catch (error) {

            expect(error).to.be.an.instanceof(Error);
            expect(error.code).to.equal(ErrorCode.NOT_IMPLEMENTED_YET);
            expect(error.message).to.contain(ErrorMessage.NOT_IMPLEMENTED_YET);
            hasThrown = true;

        }

        expect(hasThrown).to.equal(true);

    });

    it("should returns voyager dialogs", async () => {
        let res = await instance.dialogs("voy");
        assert.isNotNull(res);
        assert.isArray(res.data);
        assert.isTrue(res.data.length > 0);
        assert.isNull(res.errors);

        let one_dialog: IDialog = res.data[0];
        assert.isDefined(one_dialog);
        assert.deepEqual(one_dialog, {
            character_id: 14,
            didascalis: {
                didascalis: []
            },
            episode_id: 548,
            episode_title: "caretaker",
            id: 197828,
            room: {
                rooms: []
            },
            serie_id: 4,
            speaker_name: "Chakotay",
            text: " Be creative!\n"
        });

        assert.isTrue(voyager_mock.isDone());
    });

});
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
const chai_1 = require("chai");
const nock_1 = __importDefault(require("nock"));
const __1 = require("..");
const ErrorCode_1 = require("../error/ErrorCode");
const ErrorMessage_1 = require("../error/ErrorMessage");
const configs_1 = require("../config/configs");
let instance;
let voyager_mock;
let episode_704_mock;
before(() => __awaiter(this, void 0, void 0, function* () {
    instance = new __1.StarTrek();
    episode_704_mock = nock_1.default(configs_1.configs.api_url, { "allowUnmocked": false })
        .persist()
        .get("/api/v1/dialogs/episode/704")
        .reply(200, [
        {
            "character_id": 123,
            "didascalis": {
                "didascalis": []
            },
            "episode_id": 704,
            "episode_title": "natural law",
            "id": 264112,
            "room": {
                "rooms": []
            },
            "serie_id": 4,
            "speaker_name": "Seven",
            "text": " I was, but you were right. Warp Mechanics can be studied any\ntime. The Ventu, on the other hand. \n"
        }
    ]);
    voyager_mock = nock_1.default(configs_1.configs.api_url, { "allowUnmocked": false })
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
}));
describe('Connect to the api when instanciated', () => {
    it("should be configured", () => __awaiter(this, void 0, void 0, function* () {
        nock_1.default(configs_1.configs.api_url, { "allowUnmocked": true })
            .get('/api/v1')
            .reply(200);
        chai_1.expect(yield instance.isConfigured()).to.equal(true);
    }));
});
describe('dialogs function tests', () => {
    it('should throw not found error', () => __awaiter(this, void 0, void 0, function* () {
        let hasThrown = false;
        try {
            yield instance.dialogs("", "");
        }
        catch (error) {
            chai_1.expect(error).to.be.an.instanceof(Error);
            chai_1.expect(error.code).to.equal(ErrorCode_1.ErrorCode.NOT_FOUND_ERROR);
            chai_1.expect(error.message).to.contain(ErrorMessage_1.ErrorMessage.NOT_FOUND_ERROR);
            hasThrown = true;
        }
        chai_1.expect(hasThrown).to.equal(true);
    }));
    it('should throw not implemented yet error', () => __awaiter(this, void 0, void 0, function* () {
        let hasThrown = false;
        try {
            let error = yield instance.dialogs("VOY", "JANEWAY");
        }
        catch (error) {
            chai_1.expect(error).to.be.an.instanceof(Error);
            chai_1.expect(error.code).to.equal(ErrorCode_1.ErrorCode.NOT_IMPLEMENTED_YET);
            chai_1.expect(error.message).to.contain(ErrorMessage_1.ErrorMessage.NOT_IMPLEMENTED_YET);
            hasThrown = true;
        }
        chai_1.expect(hasThrown).to.equal(true);
    }));
    it("should returns episode 704 dialogs when asked with url", () => __awaiter(this, void 0, void 0, function* () {
        let res = yield instance.dialogs(null, null, "/dialogs/episode/704");
        chai_1.assert.isNotNull(res);
        chai_1.assert.isArray(res.data);
        chai_1.assert.isTrue(res.data.length > 0);
        chai_1.assert.isNull(res.errors);
        let one_dialog = res.data[0];
        chai_1.assert.isDefined(one_dialog);
        chai_1.assert.deepEqual(one_dialog, {
            "character_id": 123,
            "didascalis": {
                "didascalis": []
            },
            "episode_id": 704,
            "episode_title": "natural law",
            "id": 264112,
            "room": {
                "rooms": []
            },
            "serie_id": 4,
            "speaker_name": "Seven",
            "text": " I was, but you were right. Warp Mechanics can be studied any\ntime. The Ventu, on the other hand. \n"
        });
        chai_1.assert.isTrue(episode_704_mock.isDone());
    }));
    it("should returns voyager dialogs", () => __awaiter(this, void 0, void 0, function* () {
        let res = yield instance.dialogs("voy");
        chai_1.assert.isNotNull(res);
        chai_1.assert.isArray(res.data);
        chai_1.assert.isTrue(res.data.length > 0);
        chai_1.assert.isNull(res.errors);
        let one_dialog = res.data[0];
        chai_1.assert.isDefined(one_dialog);
        chai_1.assert.deepEqual(one_dialog, {
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
        chai_1.assert.isTrue(voyager_mock.isDone());
    }));
});
//# sourceMappingURL=dialogs.test.js.map
'use strict';
var expect = require('chai').expect;
var stc = require('../dist/index.js').StarTrek;
var configs = require('../dist/config/configs.js');
describe('dialogs function tests', () => {
    it('should throw not implemented error', () => {
        var hasThrown = false;
        try {
            stc().dialogs();
        }
        catch (error) {
            hasThrown = true;
        }
        expect(hasThrown).to.equal(true);
    });
    it('should have a valid configuration', () => {
    });
});
//# sourceMappingURL=test.js.map
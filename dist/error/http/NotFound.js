"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("../BaseError");
class NotFound extends BaseError_1.BaseError {
    constructor(code, message, target, details) {
        super(code, message, target, details);
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=NotFound.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(code, message, target, details) {
        super();
        this.code = code;
        this.message = message;
        this.target = target;
        this.details = details;
    }
    addDetail(detail) {
        this.details.push(detail);
    }
    addDetails(details) {
        this.details.push(...details);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map
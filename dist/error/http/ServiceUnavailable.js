"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./../BaseError");
class ServiceNotAvailable extends BaseError_1.BaseError {
    constructor(code, message, target, details) {
        super(code, message, target, details);
        this.code = code;
        this.message = message;
        this.target = target;
        this.details = details;
    }
}
exports.ServiceNotAvailable = ServiceNotAvailable;
//# sourceMappingURL=ServiceUnavailable.js.map
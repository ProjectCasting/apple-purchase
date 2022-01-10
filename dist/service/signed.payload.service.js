"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedPayloadService = void 0;
const signed_payload_entity_1 = require("../typeorm/entities/signed.payload.entity");
class SignedPayloadService {
    constructor(connection) {
        this.signedPayloadRepo = connection.getRepository(signed_payload_entity_1.SignedPayload);
    }
    create(payload) {
        return this.signedPayloadRepo.save({ payload });
    }
}
exports.SignedPayloadService = SignedPayloadService;
//# sourceMappingURL=signed.payload.service.js.map
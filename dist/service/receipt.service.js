"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptService = void 0;
const receipt_entity_1 = require("../typeorm/entities/receipt.entity");
class ReceiptService {
    constructor(connection) {
        this.receiptRepo = connection.getRepository(receipt_entity_1.Receipt);
    }
    create(userId, payload) {
        return this.receiptRepo.save({ userId, payload });
    }
}
exports.ReceiptService = ReceiptService;
//# sourceMappingURL=receipt.service.js.map
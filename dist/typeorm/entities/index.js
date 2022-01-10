"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const product_entity_1 = require("./product.entity");
const subscription_entity_1 = require("./subscription.entity");
const transaction_entity_1 = require("./transaction.entity");
const receipt_entity_1 = require("./receipt.entity");
const signed_payload_entity_1 = require("./signed.payload.entity");
exports.entities = [
    product_entity_1.Product,
    subscription_entity_1.Subscription,
    transaction_entity_1.Transaction,
    receipt_entity_1.Receipt,
    signed_payload_entity_1.SignedPayload
];
//# sourceMappingURL=index.js.map
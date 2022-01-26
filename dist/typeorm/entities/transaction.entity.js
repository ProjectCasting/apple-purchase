"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const subscription_entity_1 = require("./subscription.entity");
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 40 }),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_transaction_id', nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "originalTransactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'purchase_date' }),
    __metadata("design:type", Date)
], Transaction.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_date' }),
    __metadata("design:type", Date)
], Transaction.prototype, "expiresDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_trial_period' }),
    __metadata("design:type", Boolean)
], Transaction.prototype, "isTrial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ownership_type', nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "ownershipType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_type', nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "requestType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Transaction.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id', referencedColumnName: 'id' }),
    __metadata("design:type", product_entity_1.Product)
], Transaction.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_entity_1.Subscription),
    (0, typeorm_1.JoinColumn)({ name: 'subscription_id', referencedColumnName: 'id' }),
    __metadata("design:type", subscription_entity_1.Subscription)
], Transaction.prototype, "subscription", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)({ name: 'transactions' })
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.entity.js.map
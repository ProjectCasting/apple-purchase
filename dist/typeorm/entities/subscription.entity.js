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
exports.Subscription = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let Subscription = class Subscription {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 40 }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    __metadata("design:type", Date)
], Subscription.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_date', nullable: true }),
    __metadata("design:type", Date)
], Subscription.prototype, "expiresDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_trial_period' }),
    __metadata("design:type", Boolean)
], Subscription.prototype, "isTrial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'auto_renew_status' }),
    __metadata("design:type", Boolean)
], Subscription.prototype, "autoRenewStatus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Subscription.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Subscription.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id', referencedColumnName: 'id' }),
    __metadata("design:type", product_entity_1.Product)
], Subscription.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'revocation_date', nullable: true }),
    __metadata("design:type", Date)
], Subscription.prototype, "revocationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'revocation_reason', nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "revocationReason", void 0);
Subscription = __decorate([
    (0, typeorm_1.Entity)({ name: 'subscriptions' })
], Subscription);
exports.Subscription = Subscription;
//# sourceMappingURL=subscription.entity.js.map
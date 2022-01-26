"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const moment_1 = __importDefault(require("moment"));
const subscription_entity_1 = require("../typeorm/entities/subscription.entity");
const product_entity_1 = require("../typeorm/entities/product.entity");
const transaction_entity_1 = require("../typeorm/entities/transaction.entity");
const product_type_1 = require("../constant/product.type");
class SubscriptionService {
    constructor(connection) {
        this.subscriptionRepo = connection.getRepository(subscription_entity_1.Subscription);
        this.transactionRepo = connection.getRepository(transaction_entity_1.Transaction);
        this.productRepo = connection.getRepository(product_entity_1.Product);
    }
    async create(data, userId) {
        const product = await this.productRepo.findOne(data.productId);
        if (!product) {
            throw new Error('Product not exist');
        }
        const transaction = await this.transactionRepo.findOne(data.transactionId);
        if (transaction) {
            throw new Error('Duplicate transaction');
        }
        const subscription = await this.subscriptionRepo.save({
            userId,
            startDate: (0, moment_1.default)(data.purchaseDate).toDate(),
            expiresDate: data.expiresDate && (0, moment_1.default)(data.expiresDate).toDate(),
            isTrial: data.isTrialPeriod === 'true',
            autoRenewStatus: data.autoRenewStatus,
            product
        });
        await this.transactionRepo.save({
            userId: subscription.userId,
            subscription,
            product,
            id: data.transactionId,
            originalTransactionId: data.originalTransactionId,
            purchaseDate: (0, moment_1.default)(data.purchaseDate).toDate(),
            expiresDate: data.expiresDate && (0, moment_1.default)(data.expiresDate).toDate(),
            isTrial: data.isTrialPeriod === 'true',
            ownershipType: data.inAppOwnershipType,
            requestType: data.requestType
        });
        return subscription;
    }
    async update(data) {
        const originalTransaction = await this.transactionRepo.findOne({
            originalTransactionId: data.originalTransactionId
        });
        if (!originalTransaction) {
            throw new Error('original transaction not exist');
        }
        const product = await this.productRepo.findOne(data.productId);
        if (!product) {
            throw new Error('product not exist');
        }
        const transaction = await this.transactionRepo.findOne(data.transactionId);
        if (transaction) {
            throw new Error('Duplicate transaction');
        }
        const subscription = await this.subscriptionRepo.findOne({
            userId: originalTransaction.userId,
            product
        });
        subscription.expiresDate = data.expiresDate && (0, moment_1.default)(data.expiresDate).toDate();
        subscription.isTrial = data.isTrialPeriod === 'true';
        subscription.autoRenewStatus = data.autoRenewStatus;
        await this.subscriptionRepo.save(subscription);
        await this.transactionRepo.save({
            userId: subscription.userId,
            subscription,
            product,
            id: data.transactionId,
            originalTransactionId: data.originalTransactionId,
            purchaseDate: (0, moment_1.default)(data.purchaseDate).toDate(),
            expiresDate: data.expiresDate && (0, moment_1.default)(data.expiresDate).toDate(),
            isTrial: data.isTrialPeriod === 'true',
            ownershipType: data.inAppOwnershipType,
            requestType: data.requestType
        });
        return subscription;
    }
    async createOrUpdate(data, userId) {
        const product = await this.productRepo.findOne(data.productId);
        if (!product) {
            throw new Error('product not exist');
        }
        const transaction = await this.transactionRepo.findOne(data.transactionId);
        if (transaction) {
            throw new Error('Duplicate transaction');
        }
        const originalTransaction = await this.transactionRepo.findOne({
            originalTransactionId: data.originalTransactionId
        });
        if (originalTransaction && `${originalTransaction.userId}` !== `${userId}`) {
            console.log(`[Apple-Purchase] Invalid user id ${userId} for original transaction ${data.originalTransactionId}`);
            throw new Error('Invalid transaction');
        }
        let subscription = await this.subscriptionRepo.findOne({
            userId,
            product
        });
        if (subscription) {
            subscription.expiresDate = data.expiresDate && (0, moment_1.default)(data.expiresDate).toDate();
            subscription.isTrial = data.isTrialPeriod === 'true';
            subscription.autoRenewStatus = data.autoRenewStatus;
            await this.subscriptionRepo.save(subscription);
        }
        else {
            subscription = await this.subscriptionRepo.save({
                userId,
                startDate: (0, moment_1.default)(data.purchaseDate).toDate(),
                expiresDate: data.expiresDate && (0, moment_1.default)(data.expiresDate).toDate(),
                isTrial: data.isTrialPeriod === 'true',
                autoRenewStatus: product.type === product_type_1.ProductType.AUTO_RENEWABLE,
                product
            });
        }
        await this.transactionRepo.save({
            userId: subscription.userId,
            subscription,
            product,
            id: data.transactionId,
            originalTransactionId: data.originalTransactionId,
            purchaseDate: (0, moment_1.default)(data.purchaseDate).toDate(),
            expiresDate: data.expiresDate && (0, moment_1.default)(data.expiresDate).toDate(),
            isTrial: data.isTrialPeriod === 'true',
            ownershipType: data.inAppOwnershipType,
            requestType: data.requestType
        });
        return subscription;
    }
    async updateRenewStatus(data) {
        const originalTransaction = await this.transactionRepo.findOne({
            originalTransactionId: data.originalTransactionId
        });
        if (!originalTransaction) {
            throw new Error('original transaction not exist');
        }
        const product = await this.productRepo.findOne(data.productId);
        if (!product) {
            throw new Error('product not exist');
        }
        const transaction = await this.transactionRepo.findOne(data.transactionId);
        if (!transaction) {
            throw new Error('transaction not exist');
        }
        const subscription = await this.subscriptionRepo.findOne({
            userId: originalTransaction.userId,
            product
        });
        subscription.autoRenewStatus = data.autoRenewStatus;
        await this.subscriptionRepo.save(subscription);
        return subscription;
    }
}
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map
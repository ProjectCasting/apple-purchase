"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplePurchase = void 0;
const index_1 = require("./typeorm/index");
const apple_webhook_1 = require("./constant/apple.webhook");
const service_1 = require("./service");
class ApplePurchase {
    constructor(options) {
        this.options = options;
    }
    async handleReceipt(userId, receipt) {
        try {
            const { env, shareSecret, connectionOptions } = this.options;
            const connection = await (0, index_1.getConnection)(connectionOptions);
            const receiptService = new service_1.ReceiptService(connection);
            const appleVerifyService = new service_1.AppleVerifyService(env, shareSecret);
            const subscriptionService = new service_1.SubscriptionService(connection);
            await receiptService.create(userId, receipt);
            const verifyData = await appleVerifyService.validatePurchase(receipt);
            const { status, message } = verifyData;
            if (!verifyData.data || !verifyData.data.receipt) {
                return { status, message };
            }
            const receiptInfo = verifyData.data.receipt;
            const inAppIndex = receiptInfo.in_app.length - 1;
            const payload = appleVerifyService.formatInAppPayload(receiptInfo.in_app[inAppIndex]);
            console.log('[Apple-Purchase] Handle receipt payload', payload);
            const data = await subscriptionService.createOrUpdate(payload, userId);
            return { status, message, data };
        }
        catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }
    async handleWebhook(signedPayload) {
        try {
            const { connectionOptions } = this.options;
            const connection = await (0, index_1.getConnection)(connectionOptions);
            const signedPayloadService = new service_1.SignedPayloadService(connection);
            const appleWebhookService = new service_1.AppleWebhookService();
            const subscriptionService = new service_1.SubscriptionService(connection);
            await signedPayloadService.create(signedPayload);
            const result = await appleWebhookService.handle(signedPayload);
            if (!result) {
                return {
                    status: 500,
                    message: 'Unhandled action'
                };
            }
            const { action, payload } = result;
            console.log('[Apple-Purchase] Handle webhook payload', payload);
            let subscription;
            if (action === apple_webhook_1.Action.CHANGE_RENEW) {
                subscription = await subscriptionService.updateRenewStatus(payload);
            }
            else if (action === apple_webhook_1.Action.UPDATE) {
                subscription = await subscriptionService.update(payload);
            }
            else if (action === apple_webhook_1.Action.REFUND) {
                subscription = await subscriptionService.refund(payload);
            }
            return {
                status: 200,
                data: subscription
            };
        }
        catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }
}
exports.ApplePurchase = ApplePurchase;
//# sourceMappingURL=index.js.map
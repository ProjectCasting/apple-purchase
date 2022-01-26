"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleVerifyService = void 0;
const axios_1 = __importDefault(require("axios"));
const apple_env_1 = require("../constant/apple.env");
const apple_code_1 = require("../constant/apple.code");
const apple_message_1 = require("../constant/apple.message");
const request_type_1 = require("../constant/request.type");
class AppleVerifyService {
    constructor(env, shareSecret) {
        this.env = env;
        this.shareSecret = shareSecret;
    }
    getEnvironment() {
        return this.env === 'Production' ? apple_env_1.AppleEnv.LIVE : apple_env_1.AppleEnv.SANDBOX;
    }
    getHost(env) {
        if (env === apple_env_1.AppleEnv.LIVE) {
            return 'https://buy.itunes.apple.com/verifyReceipt';
        }
        else {
            return 'https://sandbox.itunes.apple.com/verifyReceipt';
        }
    }
    getPostData(receipt) {
        return {
            'receipt-data': receipt,
            password: this.shareSecret
        };
    }
    getResult(status) {
        return {
            status,
            message: apple_message_1.AppleMessage[apple_code_1.AppleCode[status]]
        };
    }
    checkEmptyPurchase(data) {
        const inApp = data.receipt['in_app'];
        return inApp && !inApp.length;
    }
    formatInAppPayload(inApp) {
        return {
            productId: inApp.product_id,
            transactionId: inApp.transaction_id,
            originalTransactionId: inApp.original_transaction_id,
            purchaseDate: parseInt(inApp.purchase_date_ms),
            expiresDate: inApp.expires_date_ms && parseInt(inApp.expires_date_ms),
            inAppOwnershipType: inApp.in_app_ownership_type,
            isTrialPeriod: inApp.is_trial_period,
            requestType: request_type_1.RequestType.RECEIPT
        };
    }
    async validatePurchase(receipt) {
        const appleEnv = this.getEnvironment();
        const host = this.getHost(appleEnv);
        const postData = this.getPostData(receipt);
        const response = await axios_1.default.post(host, postData);
        const data = response.data;
        const result = this.getResult(data.status);
        if (data.status !== apple_code_1.AppleCode.SUCCESS) {
            return result;
        }
        const isEmptyPurchase = this.checkEmptyPurchase(data);
        if (isEmptyPurchase) {
            return this.getResult(apple_code_1.AppleCode.VALID_BUT_EMPTY);
        }
        return Object.assign(Object.assign({}, result), { data });
    }
}
exports.AppleVerifyService = AppleVerifyService;
//# sourceMappingURL=apple.verify.service.js.map
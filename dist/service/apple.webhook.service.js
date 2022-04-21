"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleWebhookService = void 0;
const apple_webhook_1 = require("../constant/apple.webhook");
const request_type_1 = require("../constant/request.type");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_jose_1 = __importDefault(require("node-jose"));
const pem_1 = __importDefault(require("pem"));
class AppleWebhookService {
    constructor() { }
    parsing(str) {
        const jsonStr = Buffer.from(str, 'base64').toString('utf-8');
        return JSON.parse(jsonStr);
    }
    x5cToCert(x5c) {
        const cert = x5c.match(/[\s\S]{1,64}/g).join('\n');
        return (`-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`);
    }
    verifySigningChain(cert, certs) {
        return new Promise((resolve, reject) => {
            pem_1.default.verifySigningChain(cert, certs, (err, ver) => {
                if (err)
                    return reject(err);
                return resolve(ver);
            });
        });
    }
    async verfiyPayload(signedPayload) {
        try {
            const payloadArr = signedPayload.split('.');
            if (payloadArr.length !== 3) {
                return null;
            }
            const [jwsHeader] = payloadArr;
            const header = this.parsing(jwsHeader);
            const { x5c } = header;
            const certs = x5c.map((item) => this.x5cToCert(item));
            const appleCert = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../src/certs/certificate.pem'), 'utf8').toString();
            const trusted = await this.verifySigningChain(appleCert, certs);
            if (!trusted) {
                throw new Error('Invalid x5c certificate');
            }
            const keystore = node_jose_1.default.JWK.createKeyStore();
            await keystore.add(certs[0], 'pem');
            const { payload } = await node_jose_1.default.JWS.createVerify(keystore).verify(signedPayload);
            return JSON.parse(payload.toString());
        }
        catch (error) {
            console.log(error);
            throw new Error(`Certificate verification failed, Error: ${error.message}`);
        }
    }
    async formatCreationPayload(signedRenewalInfo) {
        const transactionInfo = await this.verfiyPayload(signedRenewalInfo);
        return {
            productId: transactionInfo.productId,
            transactionId: transactionInfo.transactionId,
            originalTransactionId: transactionInfo.originalTransactionId,
            purchaseDate: transactionInfo.purchaseDate,
            expiresDate: transactionInfo.expiresDate,
            revocationDate: transactionInfo.revocationDate,
            revocationReason: transactionInfo.revocationReason,
            inAppOwnershipType: transactionInfo.inAppOwnershipType,
            requestType: request_type_1.RequestType.WEBHOOK,
            isTrialPeriod: 'false'
        };
    }
    async handleRevoke(data) {
        const payload = await this.formatCreationPayload(data.signedTransactionInfo);
        return {
            action: apple_webhook_1.Action.CHANGE_RENEW,
            payload: Object.assign(Object.assign({}, payload), { autoRenewStatus: false })
        };
    }
    async handleSubscribed(subtype, data) {
        const payload = await this.formatCreationPayload(data.signedTransactionInfo);
        return {
            action: apple_webhook_1.Action.UPDATE,
            payload
        };
    }
    async handleDidChangeRenewalStatus(subtype, data) {
        const payload = await this.formatCreationPayload(data.signedTransactionInfo);
        if (subtype === apple_webhook_1.Subtype.AUTO_RENEW_DISABLED) {
            return {
                action: apple_webhook_1.Action.CHANGE_RENEW,
                payload: Object.assign(Object.assign({}, payload), { autoRenewStatus: false })
            };
        }
        else if (subtype === apple_webhook_1.Subtype.AUTO_RENEW_ENABLED) {
            return {
                action: apple_webhook_1.Action.CHANGE_RENEW,
                payload: Object.assign(Object.assign({}, payload), { autoRenewStatus: true })
            };
        }
    }
    async handleDidRenew(subtype, data) {
        const payload = await this.formatCreationPayload(data.signedTransactionInfo);
        return {
            action: apple_webhook_1.Action.UPDATE,
            payload: Object.assign(Object.assign({}, payload), { autoRenewStatus: true })
        };
    }
    async handleExpired(subtype, data) {
        const payload = await this.formatCreationPayload(data.signedTransactionInfo);
        return {
            action: apple_webhook_1.Action.CHANGE_RENEW,
            payload: Object.assign(Object.assign({}, payload), { autoRenewStatus: false })
        };
    }
    async handleGracePeriodExpired(subtype, data) {
        const payload = await this.formatCreationPayload(data.signedTransactionInfo);
        return {
            action: apple_webhook_1.Action.CHANGE_RENEW,
            payload: Object.assign(Object.assign({}, payload), { autoRenewStatus: false })
        };
    }
    async handleRefund(subtype, data) {
        const payload = await this.formatCreationPayload(data.signedTransactionInfo);
        return {
            action: apple_webhook_1.Action.REFUND,
            payload: Object.assign(Object.assign({}, payload), { autoRenewStatus: false })
        };
    }
    async handle(signedPayload) {
        const payload = await this.verfiyPayload(signedPayload);
        const { notificationType, subtype, data } = payload;
        console.log(`[Apple-Purchase] Handle webhook notificationType: ${notificationType}, subtype: ${subtype}`);
        switch (notificationType) {
            case apple_webhook_1.NotificationType.REVOKE:
                return this.handleRevoke(data);
            case apple_webhook_1.NotificationType.SUBSCRIBED:
                return this.handleSubscribed(subtype, data);
            case apple_webhook_1.NotificationType.DID_CHANGE_RENEWAL_STATUS:
                return this.handleDidChangeRenewalStatus(subtype, data);
            case apple_webhook_1.NotificationType.DID_RENEW:
                return this.handleDidRenew(subtype, data);
            case apple_webhook_1.NotificationType.EXPIRED:
                return this.handleExpired(subtype, data);
            case apple_webhook_1.NotificationType.GRACE_PERIOD_EXPIRED:
                return this.handleGracePeriodExpired(subtype, data);
            case apple_webhook_1.NotificationType.REFUND:
                return this.handleRefund(subtype, data);
            case apple_webhook_1.NotificationType.OFFER_REDEEMED:
                break;
            case apple_webhook_1.NotificationType.DID_CHANGE_RENEWAL_PREF:
                break;
            case apple_webhook_1.NotificationType.DID_FAIL_TO_RENEW:
                break;
            case apple_webhook_1.NotificationType.PRICE_INCREASE:
                break;
            case apple_webhook_1.NotificationType.CONSUMPTION_REQUEST:
                break;
            case apple_webhook_1.NotificationType.REFUND_DECLINED:
                break;
            case apple_webhook_1.NotificationType.RENEWAL_EXTENDED:
                break;
            default:
                break;
        }
    }
}
exports.AppleWebhookService = AppleWebhookService;
//# sourceMappingURL=apple.webhook.service.js.map
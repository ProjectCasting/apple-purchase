import { Subtype, Action } from '../constant/apple.webhook';
import { SubscriptionPayload } from '../interface/subscription.create';
import { DecodePayloadData } from '../interface/apple.webhook';
export declare class AppleWebhookService {
    constructor();
    private parsing;
    private x5cToCert;
    private verifySigningChain;
    private verfiyPayload;
    formatCreationPayload(signedRenewalInfo: string): Promise<SubscriptionPayload>;
    handleRevoke(data: DecodePayloadData): Promise<{
        action: Action;
        payload: {
            autoRenewStatus: boolean;
            productId: string;
            transactionId: string;
            originalTransactionId: string;
            purchaseDate: number;
            expiresDate: number;
            inAppOwnershipType: string;
            isTrialPeriod?: string;
        };
    }>;
    handleSubscribed(subtype: Subtype, data: DecodePayloadData): Promise<{
        action: Action;
        payload: SubscriptionPayload;
    }>;
    handleDidChangeRenewalStatus(subtype: Subtype, data: DecodePayloadData): Promise<{
        action: Action;
        payload: {
            autoRenewStatus: boolean;
            productId: string;
            transactionId: string;
            originalTransactionId: string;
            purchaseDate: number;
            expiresDate: number;
            inAppOwnershipType: string;
            isTrialPeriod?: string;
        };
    }>;
    handleDidRenew(subtype: Subtype, data: DecodePayloadData): Promise<{
        action: Action;
        payload: {
            autoRenewStatus: boolean;
            productId: string;
            transactionId: string;
            originalTransactionId: string;
            purchaseDate: number;
            expiresDate: number;
            inAppOwnershipType: string;
            isTrialPeriod?: string;
        };
    }>;
    handleExpired(subtype: Subtype, data: DecodePayloadData): Promise<{
        action: Action;
        payload: {
            autoRenewStatus: boolean;
            productId: string;
            transactionId: string;
            originalTransactionId: string;
            purchaseDate: number;
            expiresDate: number;
            inAppOwnershipType: string;
            isTrialPeriod?: string;
        };
    }>;
    handleGracePeriodExpired(subtype: Subtype, data: DecodePayloadData): Promise<{
        action: Action;
        payload: {
            autoRenewStatus: boolean;
            productId: string;
            transactionId: string;
            originalTransactionId: string;
            purchaseDate: number;
            expiresDate: number;
            inAppOwnershipType: string;
            isTrialPeriod?: string;
        };
    }>;
    handle(signedPayload: string): Promise<{
        action: Action;
        payload: SubscriptionPayload;
    }>;
}

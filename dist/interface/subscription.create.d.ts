export interface SubscriptionPayload {
    productId: string;
    transactionId: string;
    originalTransactionId: string;
    purchaseDate: number;
    expiresDate: number;
    inAppOwnershipType: string;
    isTrialPeriod?: string;
    autoRenewStatus?: boolean;
}

import { Subtype } from "../constant/apple.webhook";

export interface TransactionDecodedPayload {
  transactionId: string;
  originalTransactionId: string;
  webOrderLineItemId: string;
  bundleId: string;
  productId: string;
  purchaseDate: number;
  originalPurchaseDate: number;
  expiresDate: number;
  quantity: string;
  type: string;
  inAppOwnershipType: string;
  signedDate: number;
  appAccountToken?: string;
  subscriptionGroupIdentifier?: string;
  isUpgraded?: string;
  offerIdentifier?: string;
  offerType?: string;
  revocationDate?: number;
  revocationReason?: string;
}

export interface RenewalInfoDecodedPayload {
  productId: string;
  signedDate: number;
  originalTransactionId: string;
  autoRenewStatus: number;
  autoRenewProductId: string;
  gracePeriodExpiresDate?: number;
  isInBillingRetryPeriod?: string;
  offerIdentifier?: string;
  offerType?: string;
  priceIncreaseStatus?: string;
  expirationIntent?: string;
}

export interface DecodePayloadData {
  bundleId: string;
  bundleVersion: string;
  environment: string;
  signedTransactionInfo: string;
  signedRenewalInfo: string;
}

export interface DecodePayload {
  notificationType: string;
  subtype: Subtype;
  notificationUUID: string;
  data: DecodePayloadData;
  version: string;
}

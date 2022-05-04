export interface SubscriptionPayload {
  productId: string
  transactionId: string
  originalTransactionId: string
  purchaseDate: number
  expiresDate: number
  inAppOwnershipType: string
  requestType: string
  revocationDate?: number
  revocationReason?: string
  isTrialPeriod?: string
  autoRenewStatus?: boolean
}

import { AppleVerifyService } from './apple.verify.service'
import { SubscriptionService } from './subscription.service'
import { AppleWebhookService } from './apple.webhook.service'
import { ReceiptService } from './receipt.service'
import { SignedPayloadService } from './signed.payload.service'

export const services = [
  AppleVerifyService,
  SubscriptionService,
  AppleWebhookService,
  ReceiptService,
  SignedPayloadService
]
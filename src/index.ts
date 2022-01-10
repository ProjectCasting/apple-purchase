import { ConnectionOptions } from "typeorm";
import { getConnection } from "./typeorm/index";
import { Action } from "./constant/apple.webhook";
import {
  AppleVerifyService,
  SubscriptionService,
  ReceiptService,
  SignedPayloadService,
  AppleWebhookService
} from './service'
import { Subscription } from "./typeorm/entities/subscription.entity";

export interface purchaseOptions {
  env: string;
  shareSecret: string;
  connectionOptions: ConnectionOptions;
}

export class ApplePurchase {
  constructor (
    private options: purchaseOptions
  ) {}

  async handleReceipt(userId: string, receipt: string): Promise<{
    status: number;
    message?: string;
    data?: Subscription
  }> {
    try {
      const { env, shareSecret, connectionOptions } = this.options
      const connection = await getConnection(connectionOptions)
      const receiptService = new ReceiptService(connection)
      const appleVerifyService = new AppleVerifyService(env, shareSecret)
      const subscriptionService = new SubscriptionService(connection)

      await receiptService.create(userId, receipt)

      const verifyData = await appleVerifyService.validatePurchase(receipt)
      // console.log('verfiy data', verifyData)

      const { status, message } = verifyData
      if (!verifyData.data || !verifyData.data.receipt) {
        return { status, message }
      }

      const receiptInfo = verifyData.data.receipt
      const inAppIndex = receiptInfo.in_app.length - 1

      const payload = appleVerifyService.formatInAppPayload(receiptInfo.in_app[inAppIndex]);
      console.log('[Apple-Purchase] Handle receipt payload', payload)

      const data = await subscriptionService.createOrUpdate(payload, userId)
      return { status, message, data }
    } catch (error) {
      return {
        status: 500,
        message: error.message
      }
    }
  }

  async handleWebhook(signedPayload: string): Promise<{
    status: number,
    message?: string,
    data?: Subscription
  }>{
    try {
      const { connectionOptions } = this.options
      const connection = await getConnection(connectionOptions)
      const signedPayloadService = new SignedPayloadService(connection)
      const appleWebhookService = new AppleWebhookService()
      const subscriptionService = new SubscriptionService(connection)

      await signedPayloadService.create(signedPayload)
      const result = await appleWebhookService.handle(signedPayload)
      const { action, payload } = result
      console.log('[Apple-Purchase] Handle webhook payload', payload)

      let subscription: Subscription

      if (action === Action.CHANGE_RENEW) {
        subscription = await subscriptionService.updateRenewStatus(payload)
      } else if (action === Action.UPDATE) {
        subscription = await subscriptionService.update(payload)
      }

      return {
        status: 200,
        data: subscription
      }
    } catch (error) {
      return {
        status: 500,
        message: error.message
      }
    }
  }
}
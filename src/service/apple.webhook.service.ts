import { NotificationType, Subtype, Action } from '../constant/apple.webhook'
import { SubscriptionPayload } from '../interface/subscription.create'
import { TransactionDecodedPayload, DecodePayload, DecodePayloadData } from '../interface/apple.webhook'

import fs from 'fs'
import path from 'path'
import jose from 'node-jose'
import pem from 'pem'

export class AppleWebhookService {
  constructor() { }

  private parsing(str: string): any {
    const jsonStr = Buffer.from(str, 'base64').toString('utf-8')
    return JSON.parse(jsonStr)
  }

  private x5cToCert(x5c: string): string {
    const cert = x5c.match(/[\s\S]{1,64}/g).join('\n')
    return (`-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`)
  }

  private verifySigningChain(cert: string, certs: string[]) {
    return new Promise((resolve, reject) => {
      pem.verifySigningChain(cert, certs, (err, ver) => {
        if (err) return reject(err)
        return resolve(ver)
      })
    })
  }

  private async verfiyPayload(signedPayload: string): Promise<any> {
    try {
      const payloadArr = signedPayload.split('.')

      if (payloadArr.length !== 3) {
        return null
      }

      const [jwsHeader] = payloadArr
      const header = this.parsing(jwsHeader)

      const { x5c } = header

      const certs = x5c.map((item: string) => this.x5cToCert(item))
      const appleCert = fs.readFileSync(path.resolve('./src/certs/certificate.pem'), 'utf8').toString()

      const trusted = await this.verifySigningChain(appleCert, certs)
      if (!trusted) {
        throw new Error('Invalid x5c certificate')
      }

      const keystore = jose.JWK.createKeyStore()
      await keystore.add(certs[0], 'pem')
      const { payload } = await jose.JWS.createVerify(keystore).verify(signedPayload)
      return JSON.parse(payload.toString())
    } catch (error) {
      console.log(error)
      throw new Error(`Certificate verification failed, Error: ${error.message}`)
    }
  }

  async formatCreationPayload(
    signedRenewalInfo: string
  ): Promise<SubscriptionPayload> {
    const transactionInfo: TransactionDecodedPayload = await this.verfiyPayload(signedRenewalInfo)
    return {
      productId: transactionInfo.productId,
      transactionId: transactionInfo.transactionId,
      originalTransactionId: transactionInfo.originalTransactionId,
      purchaseDate: transactionInfo.purchaseDate,
      expiresDate: transactionInfo.expiresDate,
      inAppOwnershipType: transactionInfo.inAppOwnershipType,
      isTrialPeriod: 'false'
    }
  }

  async handleRevoke(data: DecodePayloadData) {
    const payload = await this.formatCreationPayload(data.signedTransactionInfo)
    return {
      action: Action.UPDATE,
      payload: {
        ...payload,
        autoRenewStatus: false
      }
    }
  }

  // subtype = INITIAL_BUY / RESUBSCRIBE
  async handleSubscribed(subtype: Subtype, data: DecodePayloadData) {
    const payload = await this.formatCreationPayload(data.signedTransactionInfo)
    if (subtype === Subtype.INITIAL_BUY) {
      return {
        action: Action.CREATE,
        payload
      }
    } else if (subtype === Subtype.RESUBSCRIBE) {
      return {
        action: Action.UPDATE,
        payload
      }
    }
  }

  // subtype = AUTO_RENEW_DISABLED / AUTO_RENEW_ENABLED
  async handleDidChangeRenewalStatus(subtype: Subtype, data: DecodePayloadData) {
    const payload = await this.formatCreationPayload(data.signedTransactionInfo)
    if (subtype === Subtype.AUTO_RENEW_DISABLED) {
      return {
        action: Action.UPDATE,
        payload: {
          ...payload,
          autoRenewStatus: false
        }
      }
    } else if (subtype === Subtype.AUTO_RENEW_ENABLED) {
      return {
        action: Action.UPDATE,
        payload: {
          ...payload,
          autoRenewStatus: true
        }
      }
    }
  }

  // subtype = BILLING_RECOVERY / null
  async handleDidRenew(subtype: Subtype, data: DecodePayloadData) {
    const payload = await this.formatCreationPayload(data.signedTransactionInfo)
    return {
      action: Action.UPDATE,
      payload
    }
  }

  // subtype = VOLUNTARY / BILLING_RETRY / PRICE_INCREASE
  async handleExpired(subtype: Subtype, data: DecodePayloadData) {
    const payload = await this.formatCreationPayload(data.signedTransactionInfo)
    return {
      action: Action.UPDATE,
      payload: {
        ...payload,
        autoRenewStatus: true
      }
    }
  }

  async handleGracePeriodExpired(subtype: Subtype, data: DecodePayloadData) {
    const payload = await this.formatCreationPayload(data.signedTransactionInfo)
    return {
      action: Action.UPDATE,
      payload: {
        ...payload,
        autoRenewStatus: true
      }
    }
  }

  async handle(signedPayload: string): Promise<{
    action: Action;
    payload: SubscriptionPayload;
  }> {
    const payload: DecodePayload = await this.verfiyPayload(signedPayload)
    const { notificationType, subtype, data } = payload
    switch (notificationType) {
      case NotificationType.REVOKE:

        return this.handleRevoke(data)
      case NotificationType.SUBSCRIBED:

        return this.handleSubscribed(subtype, data)
      case NotificationType.DID_CHANGE_RENEWAL_STATUS:

        return this.handleDidChangeRenewalStatus(subtype, data)
      case NotificationType.DID_RENEW:

        return this.handleDidRenew(subtype, data)
      case NotificationType.EXPIRED:

        return this.handleExpired(subtype, data)
      case NotificationType.GRACE_PERIOD_EXPIRED:

        return this.handleGracePeriodExpired(subtype, data)
      case NotificationType.OFFER_REDEEMED:
        // User has redeemed a promotional offer or discount code
        // subtype = INITIAL_BUY
        // subtype = RESUBSCRIBE
        // subtype = UPGRADE
        // subtype = DOWNGRADE
        // subtype = null
        break
      case NotificationType.DID_CHANGE_RENEWAL_PREF:
        // Subscription type changed
        // subtype = UPGRADE
        // subtype = DOWNGRADE
        break
      case NotificationType.DID_FAIL_TO_RENEW:
        // Subscription failed to renew due to a billing issue
        // subtype = GRACE_PERIOD
        // subtype = null
        break
      case NotificationType.PRICE_INCREASE:
        // System has informed the user of a subscription price increase
        // subtype = PENDING
        // subtype = ACCEPTED
        break
      case NotificationType.CONSUMPTION_REQUEST:
        // Customer initiated a refund request for a consumable in-app purchase
        break
      case NotificationType.REFUND:
        // App Store successfully refunded a transaction
        break
      case NotificationType.REFUND_DECLINED:
        // App Store declined a refund request initiated by the app developer
        break
      case NotificationType.RENEWAL_EXTENDED:
        // App Store extended the subscription renewal date that the developer requested
        break
      default:
        break
    }
  }
}

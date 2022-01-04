import { Injectable, BadRequestException } from '@nestjs/common'
import { NotificationType, Subtype } from '../constant/apple.webhook'
import { SubscriptionCreationPayload } from '../interface/subscription.create'
import { TransactionDecodedPayload, RenewalInfoDecodedPayload } from '../interface/apple.webhook'

import fs from 'fs'
import path from 'path'
import jose from 'node-jose'
import pem from 'pem'

@Injectable()
export class AppleWebhookService {
  constructor() {}

  private parsing(str: string): any {
    const jsonStr = Buffer.from(str, 'base64').toString('utf-8');
    return JSON.parse(jsonStr)
  }
  
  private x5cToCert(x5c: string): string {
    const cert = x5c.match(/[\s\S]{1,64}/g).join('\n')
    return (`-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`);
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
    const payloadArr = signedPayload.split('.')

    if (payloadArr.length !== 3) {
      return null
    }
    
    const [jwsHeader] = payloadArr
    const header = this.parsing(jwsHeader)

    const { x5c } = header
    
    const certs = x5c.map((item: string) => this.x5cToCert(item));
    const appleCert = fs.readFileSync(path.resolve('./src/certs/certificate.pem'), 'utf8').toString()

    const trusted = await this.verifySigningChain(appleCert, certs)
    console.log(trusted)
    if (!trusted) {
      throw new BadRequestException()
    }
    
    const keystore = jose.JWK.createKeyStore()
    await keystore.add(certs[0], 'pem')
    const { payload } = await jose.JWS.createVerify(keystore).verify(signedPayload)
    return JSON.parse(payload.toString())
  }
  
  checkType (notificationType: NotificationType, subtype: Subtype): Boolean {
    if (
      notificationType === NotificationType.SUBSCRIBED
      || notificationType === NotificationType.DID_RENEW
      || (
        notificationType === NotificationType.DID_CHANGE_RENEWAL_STATUS
        && subtype == Subtype.AUTO_RENEW_ENABLED
      )
    ) {
      return true
    }
    
    return false
  }
  
  formatCreationPayload(
    transactionInfo: TransactionDecodedPayload,
  ): SubscriptionCreationPayload{
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

  async decodePayload(signedPayload: string) {
    const payload = await this.verfiyPayload(signedPayload);
    const signedTransactionInfo: TransactionDecodedPayload = await this.verfiyPayload(payload.data.signedTransactionInfo)
    const signedRenewalInfo: RenewalInfoDecodedPayload = await this.verfiyPayload(payload.data.signedRenewalInfo)
    return {
      payload,
      signedTransactionInfo,
      signedRenewalInfo,
    }
  }
}

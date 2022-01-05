import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { AppleEnv } from '../constant/apple.env'
import { AppleCode } from '../constant/apple.code'
import { InApp, VerifyPostData, VerifyResponse } from '../interface/apple.verify'
import { AppleMessage } from '../constant/apple.message'
import { SubscriptionPayload } from '../interface/subscription.create'

@Injectable()
export class AppleVerifyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getEnvironment(): AppleEnv {
    const env = this.configService.get<string>('APP_ENV')
    return env === 'Production' ? AppleEnv.LIVE : AppleEnv.SANDBOX
  }

  private getHost(env: AppleEnv): string {
    if (env === AppleEnv.LIVE) {
      return 'https://buy.itunes.apple.com/verifyReceipt';
    } else {
      return 'https://sandbox.itunes.apple.com/verifyReceipt';
    }
  }

  private getPostData(receipt: string): VerifyPostData {
    const password: string = this.configService.get<string>('APPLE_SHARE_SECRET')
    return {
      'receipt-data': receipt,
      password,
    }
  }

  private getResult(status: number) {
    return {
      status,
      message: AppleMessage[AppleCode[status]]
    }
  }

  private checkEmptyPurchase(data: VerifyResponse): boolean {
    const inApp = data.receipt['in_app']
    return inApp && !inApp.length
  }

  formatInAppPayload(inApp: InApp): SubscriptionPayload {
    return {
      productId: inApp.product_id,
      transactionId: inApp.transaction_id,
      originalTransactionId: inApp.original_transaction_id,
      purchaseDate: parseInt(inApp.purchase_date_ms),
      expiresDate: inApp.expires_date_ms && parseInt(inApp.expires_date_ms),
      inAppOwnershipType: inApp.in_app_ownership_type,
      isTrialPeriod: inApp.is_trial_period
    }
  }

  async validatePurchase(receipt: string): Promise<any> {
    const appleEnv = this.getEnvironment()
    const host = this.getHost(appleEnv)
    const postData = this.getPostData(receipt)
    const response = await this.httpService.post(host, postData).toPromise()
    const data = response.data as VerifyResponse

    const result = this.getResult(data.status)

    if (data.status !== AppleCode.SUCCESS) {
      return result
    }

    const isEmptyPurchase = this.checkEmptyPurchase(data)
    if (isEmptyPurchase) {
      return this.getResult(AppleCode.VALID_BUT_EMPTY)
    }

    return {
      ...result,
      ...data
    }
  }
}

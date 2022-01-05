import { Body, Controller, Get, Post, Query, Headers, HttpCode } from '@nestjs/common'

import { AppleVerifyService } from '../service/apple.verify.service'
import { SubscriptionService } from '../service/subscription.service'
import { ReceiptService } from '../service/receipt.service'

@Controller('/apple/verify')
export class AppleVerifyController {
  constructor (
    private readonly appleVerifyService: AppleVerifyService,
    private readonly subscriptionService: SubscriptionService,
    private readonly receiptService: ReceiptService,
  ) {}

  @Post()
  @HttpCode(200)
  async verify (@Body() body: any, @Query() query: any, @Headers() headers: any) {
    await this.receiptService.create(body.userId, body.receipt)
    const verifyData = await this.appleVerifyService.validatePurchase(body.receipt)
    const { status, message } = verifyData

    console.log('verfiy data', verifyData)

    if (!verifyData.receipt) {
      return { status, message }
    }

    const inAppIndex = verifyData.receipt.in_app.length - 1
    const payload = this.appleVerifyService.formatInAppPayload(verifyData.receipt.in_app[inAppIndex]);

    console.log('verfiy data in_app', verifyData.receipt.in_app[inAppIndex])

    const data = await this.subscriptionService.createOrUpdate(payload, body.userId)
    return { status, message, data }
  }
}

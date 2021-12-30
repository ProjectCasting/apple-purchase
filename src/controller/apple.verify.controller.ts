import { Body, Controller, Get, Post, Query, Headers, HttpCode } from '@nestjs/common'

import { AppleVerifyService } from '../service/apple.verify.service'
import { SubscriptionService } from '../service/subscription.service'

@Controller('/apple/verify')
export class AppleVerifyController {
  constructor (
    private readonly appleVerifyService: AppleVerifyService,
    private readonly subscriptionService: SubscriptionService,
    
  ) {}

  @Post()
  @HttpCode(200)
  async verify (@Body() body: any, @Query() query: any, @Headers() headers: any) {
    console.log(body.signedPayload)
    const verifyData = await this.appleVerifyService.validatePurchase(body.receipt)
    
    const { status, message, inApp } = verifyData
    
    if (!inApp) {
      return { status, message }
    }

    const data = await this.subscriptionService.create(body.userId, verifyData.inApp)
    return { status, message, data }
  }
}

import { Controller, Get, Body, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { Action } from './constant/apple.webhook'
import { AppleWebhookService } from './service/apple.webhook.service'
import { SubscriptionService } from './service/subscription.service'
import { SignedPayloadService } from './service/signed.payload.service'

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly appleWebhookService: AppleWebhookService,
    private readonly subscriptionService: SubscriptionService,
    private readonly signedPayloadService: SignedPayloadService,
  ) {}

  @Get()
  async getHello(@Body() body: any): Promise<any> {
    return { ok: true }
  }

  @Post()
  async webhook(@Body() body: any): Promise<any> {
    await this.signedPayloadService.create(body.signedPayload)
    const result = await this.appleWebhookService.handle(body.signedPayload)
    console.log('decode payload from apple', result)
    if (result) {
      const { action, payload } = result
      if (action === Action.CREATE) {
        await this.subscriptionService.create(payload)
      } else if (action === Action.UPDATE) {
        await this.subscriptionService.update(payload)
      }
    }
    return { ok: true }
  }
}

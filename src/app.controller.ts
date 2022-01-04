import { Controller, Get, Body, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { AppleWebhookService } from './service/apple.webhook.service'
import { SubscriptionService } from './service/subscription.service'
import { data } from './test/data'

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly appleWebhookService: AppleWebhookService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Get()
  async getHello(@Body() body: any): Promise<any> {
    return { ok: true }
  }
  
  @Post()
  async webhook(@Body() body: any): Promise<any> {
    const result = await this.appleWebhookService.decodePayload(body.signedPayload)
    console.log('decode payload from apple', result)
    const payload = this.appleWebhookService.formatCreationPayload(result.signedTransactionInfo)
    await this.subscriptionService.createOrUpdate(payload)
    return { ok: true }
  }
}

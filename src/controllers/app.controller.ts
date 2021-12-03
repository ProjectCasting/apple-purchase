import { Body, Controller, Get, Post, Query, Headers } from '@nestjs/common'
import { AppService } from '../services/app.service'
import dayjs from 'dayjs'

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) {}

  @Get()
  getHello (): string {
    return this.appService.getHello()
  }

  @Post()
  test (@Body() body: any, @Query() query: any, @Headers() headers: any): any {
    console.log(JSON.stringify({ time: dayjs().format('YYYY-MM-DD HH:mm:ss'), body, query, headers }))
    return {
      body,
      query,
      headers
    }
  }
}

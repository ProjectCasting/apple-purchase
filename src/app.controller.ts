import { Body, Controller, Get, Post, Query, Headers } from '@nestjs/common'
import { AppService } from './app.service'
import dayjs from 'dayjs'

@Controller()
export class AppController {
  constructor (private readonly appService: AppService) {}

  @Get()
  getHello (): any {
    return { ok : true, data: {} };
  }

  @Post()
  test (@Body() body: any, @Query() query: any, @Headers() headers: any): any {
    console.log(JSON.stringify({ time: dayjs().format('YYYY-MM-DD HH:mm:ss'), body, query, headers }))
    return {
      ok: true,
      body,
      query,
      headers
    }
  }
}

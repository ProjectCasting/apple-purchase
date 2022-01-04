import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { services } from './service';
import { controllers } from './controller'
import { entities } from './entities'
import { helpers } from './helper'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...services, ...helpers]
})
export class AppModule {}

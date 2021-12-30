import moment from 'moment'
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity'
import { Product } from '../entities/product.entity'
import { Transaction } from '../entities/transaction.entity'
import { InApp } from '../interface/apple.verify'

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription) private subscriptionRepo: Repository<Subscription>,
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  
  async create(
    userId: string,
    inApp: InApp
  ): Promise<Subscription> {
    const product = await this.productRepo.findOne(inApp.product_id);
    if (!product) {
      throw new NotFoundException('product not exist');
    }
    
    const transaction = await this.transactionRepo.findOne(inApp.transaction_id);
    if (transaction) {
      throw new ConflictException('invalid transaction');
    }

    let subscription = await this.subscriptionRepo.findOne({
      userId, product
    })

    if (!subscription) {
      subscription = await this.subscriptionRepo.save({
        userId,
        startDate: moment(inApp.purchase_date, 'YYYY-MM-DD HH:mm:ss').toDate(),
        expiresDate: moment(inApp.expires_date, 'YYYY-MM-DD HH:mm:ss').toDate(),
        isTrial: inApp.is_trial_period === 'true',
        product
      })
    } else {
      console.log(subscription.startDate)
      subscription.expiresDate = moment(inApp.expires_date, 'YYYY-MM-DD HH:mm:ss').toDate();
      subscription.isTrial = inApp.is_trial_period === 'true'
      await this.subscriptionRepo.save(subscription)
    }

    console.log(inApp)

    await this.transactionRepo.save({
      userId,
      subscription,
      product,
      id: inApp.transaction_id,
      originalTransactionId: inApp.original_transaction_id,
      purchaseDate: moment(inApp.purchase_date, 'YYYY-MM-DD HH:mm:ss').toDate(),
      expiresDate: moment(inApp.expires_date, 'YYYY-MM-DD HH:mm:ss').toDate(),
      isTrial: inApp.is_trial_period === 'true',
      ownershipType: inApp.in_app_ownership_type
    })

    return subscription;
  }
}

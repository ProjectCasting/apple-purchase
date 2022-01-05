import moment from 'moment'
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity'
import { Product } from '../entities/product.entity'
import { Transaction } from '../entities/transaction.entity'
import { SubscriptionPayload } from '../interface/subscription.create'

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription) private subscriptionRepo: Repository<Subscription>,
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) { }

  async create(
    data: SubscriptionPayload,
    userId?: string
  ): Promise<Subscription> {
    const product = await this.productRepo.findOne(data.productId);
    if (!product) {
      throw new NotFoundException('product not exist');
    }

    const transaction = await this.transactionRepo.findOne(data.transactionId);
    if (transaction) {
      throw new ConflictException('invalid transaction');
    }

    const subscription = await this.subscriptionRepo.save({
      userId,
      startDate: moment(data.purchaseDate).toDate(),
      expiresDate: data.expiresDate && moment(data.expiresDate).toDate(),
      isTrial: data.isTrialPeriod === 'true',
      autoRenewStatus: data.autoRenewStatus,
      product
    })

    await this.transactionRepo.save({
      userId: subscription.userId,
      subscription,
      product,
      id: data.transactionId,
      originalTransactionId: data.originalTransactionId,
      purchaseDate: moment(data.purchaseDate).toDate(),
      expiresDate: data.expiresDate && moment(data.expiresDate).toDate(),
      isTrial: data.isTrialPeriod === 'true',
      ownershipType: data.inAppOwnershipType
    })

    return subscription
  }

  async update(
    data: SubscriptionPayload
  ): Promise<Subscription> {
    const originalTransaction = await this.transactionRepo.findOne({
      originalTransactionId: data.originalTransactionId
    });
    if (!originalTransaction) {
      throw new NotFoundException('original transaction not exist');
    }

    const product = await this.productRepo.findOne(data.productId);
    if (!product) {
      throw new NotFoundException('product not exist');
    }

    const transaction = await this.transactionRepo.findOne(data.transactionId);
    if (transaction) {
      throw new ConflictException('invalid transaction');
    }

    const subscription = await this.subscriptionRepo.findOne({
      userId: originalTransaction.userId,
      product
    })

    subscription.expiresDate = data.expiresDate && moment(data.expiresDate).toDate();
    subscription.isTrial = data.isTrialPeriod === 'true'
    subscription.autoRenewStatus = data.autoRenewStatus
    await this.subscriptionRepo.save(subscription)

    await this.transactionRepo.save({
      userId: subscription.userId,
      subscription,
      product,
      id: data.transactionId,
      originalTransactionId: data.originalTransactionId,
      purchaseDate: moment(data.purchaseDate).toDate(),
      expiresDate: data.expiresDate && moment(data.expiresDate).toDate(),
      isTrial: data.isTrialPeriod === 'true',
      ownershipType: data.inAppOwnershipType
    })

    return subscription
  }

  async createOrUpdate(
    data: SubscriptionPayload,
    userId?: string
  ): Promise<Subscription> {
    const product = await this.productRepo.findOne(data.productId);
    if (!product) {
      throw new NotFoundException('product not exist');
    }

    const transaction = await this.transactionRepo.findOne(data.transactionId);
    if (transaction) {
      throw new ConflictException('invalid transaction');
    }

    let subscription = await this.subscriptionRepo.findOne({
      userId,
      product
    })

    if (subscription) {
      subscription.expiresDate = data.expiresDate && moment(data.expiresDate).toDate();
      subscription.isTrial = data.isTrialPeriod === 'true'
      subscription.autoRenewStatus = data.autoRenewStatus
      await this.subscriptionRepo.save(subscription)
    } else {
      subscription = await this.subscriptionRepo.save({
        userId,
        startDate: moment(data.purchaseDate).toDate(),
        expiresDate: data.expiresDate && moment(data.expiresDate).toDate(),
        isTrial: data.isTrialPeriod === 'true',
        autoRenewStatus: data.autoRenewStatus,
        product
      })
    }

    await this.transactionRepo.save({
      userId: subscription.userId,
      subscription,
      product,
      id: data.transactionId,
      originalTransactionId: data.originalTransactionId,
      purchaseDate: moment(data.purchaseDate).toDate(),
      expiresDate: data.expiresDate && moment(data.expiresDate).toDate(),
      isTrial: data.isTrialPeriod === 'true',
      ownershipType: data.inAppOwnershipType
    })

    return subscription
  }
}

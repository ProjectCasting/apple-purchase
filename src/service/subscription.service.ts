import moment from 'moment'
import { Connection, Repository } from 'typeorm';
import { Subscription } from '../typeorm/entities/subscription.entity'
import { Product } from '../typeorm/entities/product.entity'
import { Transaction } from '../typeorm/entities/transaction.entity'
import { SubscriptionPayload } from '../interface/subscription.create'

export class SubscriptionService {
  private subscriptionRepo: Repository<Subscription>
  private transactionRepo: Repository<Transaction>
  private productRepo: Repository<Product>

  constructor(connection: Connection) {
    this.subscriptionRepo = connection.getRepository(Subscription)
    this.transactionRepo = connection.getRepository(Transaction)
    this.productRepo = connection.getRepository(Product)
  }

  async create(
    data: SubscriptionPayload,
    userId?: string
  ): Promise<Subscription> {
    const product = await this.productRepo.findOne(data.productId);
    if (!product) {
      throw new Error('Product not exist');
    }

    const transaction = await this.transactionRepo.findOne(data.transactionId);
    if (transaction) {
      throw new Error('Invalid transaction');
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
    console.log(originalTransaction)
    if (!originalTransaction) {
      throw new Error('original transaction not exist');
    }

    const product = await this.productRepo.findOne(data.productId);
    if (!product) {
      throw new Error('product not exist');
    }

    const transaction = await this.transactionRepo.findOne(data.transactionId);
    if (transaction) {
      throw new Error('invalid transaction');
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
      throw new Error('product not exist');
    }

    const transaction = await this.transactionRepo.findOne(data.transactionId);
    if (transaction) {
      throw new Error('invalid transaction');
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

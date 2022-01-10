import { Connection } from 'typeorm';
import { Subscription } from '../typeorm/entities/subscription.entity';
import { SubscriptionPayload } from '../interface/subscription.create';
export declare class SubscriptionService {
    private subscriptionRepo;
    private transactionRepo;
    private productRepo;
    constructor(connection: Connection);
    create(data: SubscriptionPayload, userId?: string): Promise<Subscription>;
    update(data: SubscriptionPayload): Promise<Subscription>;
    createOrUpdate(data: SubscriptionPayload, userId?: string): Promise<Subscription>;
    updateRenewStatus(data: SubscriptionPayload): Promise<Subscription>;
}

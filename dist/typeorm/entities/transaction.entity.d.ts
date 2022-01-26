import { Product } from './product.entity';
import { Subscription } from './subscription.entity';
export declare class Transaction {
    id: string;
    originalTransactionId: string;
    userId: string;
    purchaseDate: Date;
    expiresDate: Date;
    isTrial: boolean;
    ownershipType: string;
    requestType: string;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
    subscription: Subscription;
}

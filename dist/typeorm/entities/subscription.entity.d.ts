import { Product } from './product.entity';
export declare class Subscription {
    id: string;
    userId: string;
    startDate: Date;
    expiresDate: Date;
    isTrial: boolean;
    autoRenewStatus: boolean;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
}

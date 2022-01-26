import { Product } from "./product.entity";
import { Subscription } from "./subscription.entity";
import { Transaction } from "./transaction.entity";
import { SignedPayload } from './signed.payload.entity';
export declare const entities: (typeof Transaction | typeof Product | typeof Subscription | typeof SignedPayload)[];

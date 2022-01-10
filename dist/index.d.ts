import { ConnectionOptions } from "typeorm";
import { Subscription } from "./typeorm/entities/subscription.entity";
export interface purchaseOptions {
    env: string;
    shareSecret: string;
    connectionOptions: ConnectionOptions;
}
export declare class ApplePurchase {
    private options;
    constructor(options: purchaseOptions);
    handleReceipt(userId: string, receipt: string): Promise<{
        status: number;
        message?: string;
        data?: Subscription;
    }>;
    handleWebhook(signedPayload: string): Promise<{
        status: number;
        message?: string;
        data?: Subscription;
    }>;
}

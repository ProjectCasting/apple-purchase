import { InApp, VerifyResponse } from '../interface/apple.verify';
import { SubscriptionPayload } from '../interface/subscription.create';
export declare class AppleVerifyService {
    private env;
    private shareSecret;
    constructor(env: string, shareSecret: string);
    private getEnvironment;
    private getHost;
    private getPostData;
    private getResult;
    private checkEmptyPurchase;
    formatInAppPayload(inApp: InApp): SubscriptionPayload;
    validatePurchase(receipt: string): Promise<{
        status: number;
        message: string;
        data?: VerifyResponse;
    }>;
}

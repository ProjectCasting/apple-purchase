import { Receipt } from '../typeorm/entities/receipt.entity';
import { Connection } from 'typeorm';
export declare class ReceiptService {
    private receiptRepo;
    constructor(connection: Connection);
    create(userId: string, payload: string): Promise<{
        userId: string;
        payload: string;
    } & Receipt>;
}

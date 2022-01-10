import { SignedPayload } from '../typeorm/entities/signed.payload.entity';
import { Connection } from 'typeorm';
export declare class SignedPayloadService {
    private signedPayloadRepo;
    constructor(connection: Connection);
    create(payload: string): Promise<{
        payload: string;
    } & SignedPayload>;
}

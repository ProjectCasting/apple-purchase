import { SignedPayload } from '../typeorm/entities/signed.payload.entity'
import { Connection, Repository } from 'typeorm';

export class SignedPayloadService {
  private signedPayloadRepo: Repository<SignedPayload>

  constructor(connection: Connection) {
    this.signedPayloadRepo = connection.getRepository(SignedPayload)
  }

  create(payload: string) {
    return this.signedPayloadRepo.save({payload})
  }
}

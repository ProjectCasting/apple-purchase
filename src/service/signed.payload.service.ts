import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { SignedPayload } from '../entities/signed.payload.entity'
import { Repository } from 'typeorm';

@Injectable()
export class SignedPayloadService {
  constructor(
    @InjectRepository(SignedPayload) private signedPayloadRepo: Repository<SignedPayload>,
  ) {}

  create(payload: string) {
    return this.signedPayloadRepo.save({payload})
  }
}

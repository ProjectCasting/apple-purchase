import { Receipt } from '../typeorm/entities/receipt.entity'
import { Connection, Repository } from 'typeorm';

export class ReceiptService {
  private receiptRepo: Repository<Receipt>

  constructor(connection: Connection) {
    this.receiptRepo = connection.getRepository(Receipt)
  }

  create(userId: string, payload: string) {
    return this.receiptRepo.save({userId, payload})
  }
}

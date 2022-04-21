import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Product } from './product.entity'
import { Subscription } from './subscription.entity'

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryColumn({ length: 40 })
  id: string;

  @Column({ name: 'original_transaction_id', nullable: true })
  originalTransactionId: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'purchase_date' })
  purchaseDate: Date;

  @Column({ name: 'expires_date' })
  expiresDate: Date;

  @Column({ name: 'is_trial_period' })
  isTrial: boolean;

  @Column({ name: 'ownership_type', nullable: true })
  ownershipType: string;

  @Column({ name: 'request_type', nullable: true })
  requestType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'subscription_id', referencedColumnName: 'id' })
  subscription: Subscription;

  @Column({ name: 'revocation_date', nullable: true })
  revocationDate: Date;

  @Column({ name: 'revocation_reason', nullable: true })
  revocationReason: string;
}

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Product } from './product.entity'

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryColumn({ length: 40 })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'expires_date' })
  expiresDate: Date;
  
  @Column({ name: 'is_trial_period' })
  isTrial: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm'

@Entity({ name: 'products' })
export class Product {
  @PrimaryColumn({ length: 40 })
  id: string;

  @Column({ length: 40, nullable: true })
  name: string;

  @Column({ nullable: true })
  pricing: number;

  @Column({ length: 40, nullable: true })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

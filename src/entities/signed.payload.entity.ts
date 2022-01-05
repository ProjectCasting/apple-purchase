import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'webhook_signed_payload' })
export class SignedPayload {
  @PrimaryColumn({ length: 40 })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  payload: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

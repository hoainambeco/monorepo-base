import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity()
export class CreateDateEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

// @Entity()
export class DateEntity extends CreateDateEntity {
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

// @Entity()
export class DateDeleteEntity extends DateEntity {
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}

import { Column, Entity } from 'typeorm';
import { AdminActionType } from '../constants';
import { DateEntity } from './with-date.entity';
import { WithId } from './with-id.entity';

@Entity('admin_actions')
export class AdminAction extends WithId(DateEntity) {
  @Column('varchar', { nullable: true })
  type: AdminActionType;

  @Column('json', { nullable: true })
  data: string;
}

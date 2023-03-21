import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ReceptionStatus } from './reception-status.enum';

@Entity()
export class Reception extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  reception_id: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  laundry_item: string;

  @Column()
  request_memo: string;

  @Column()
  collection_date: string;

  @Column()
  status: ReceptionStatus;

  @ManyToOne((type) => User, (user) => user.receptions, { eager: false })
  @JoinColumn({ name: 'master_id', referencedColumnName: 'master_id' })
  user: User;
}

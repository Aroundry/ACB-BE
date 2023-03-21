import { Reception } from 'src/reception/reception.entity';
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['user_id'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  master_id: string;

  @Column({ nullable: true })
  user_id: string;

  @Column()
  password: string;

  @OneToMany((type) => Reception, (reception) => reception.user, {
    eager: true,
    cascade: true,
  })
  receptions: Reception[];
}

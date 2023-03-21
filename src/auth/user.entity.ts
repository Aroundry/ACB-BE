import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
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
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Team extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  users: User[];
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';
import { Task } from '../../task/entities/task.entity';
import { Team } from '../../team/entities/team.entity';
import { Notification } from '../../notification/entities/notification.entity';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false, default: 'user' })
  roles: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Team, (team) => team.users)
  @JoinTable()
  teams: Team[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}

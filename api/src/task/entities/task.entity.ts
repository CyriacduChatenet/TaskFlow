import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Task extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

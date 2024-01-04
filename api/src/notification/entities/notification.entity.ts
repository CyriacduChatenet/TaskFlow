import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';
import { NotificationType } from '../../types/notification.type';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Notification extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  type: NotificationType;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}

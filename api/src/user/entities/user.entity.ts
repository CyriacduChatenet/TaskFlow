import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';

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
}

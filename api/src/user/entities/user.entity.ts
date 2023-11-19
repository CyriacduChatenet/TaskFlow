import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';

@Entity()
export class User extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 150 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, length: 150 })
  username: string;

  @Column({ nullable: false })
  roles: string;

  @Column({ nullable: false, default: false })
  isVerified: boolean;
}

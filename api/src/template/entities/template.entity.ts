import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';
import { Team } from '../../team/entities/team.entity';

@Entity()
export class Template extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Team, (team) => team.templates)
  @JoinTable()
  teams: Team[];
}

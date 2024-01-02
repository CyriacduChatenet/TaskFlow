import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../utils/timestamp.util';
import { Template } from '../../template/entities/template.entity';

@Entity()
export class Board extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Template, (template) => template.boards)
  template: Template;
}

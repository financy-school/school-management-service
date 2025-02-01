import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('class')
export class Class {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  class_id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200, default: null, nullable: true })
  school_id: string;

  @Column({ type: 'varchar', length: 200 })
  teacher_id: string;

  @Column({ type: 'integer', default: null })
  total_students: number;
}

import { Column, PrimaryColumn } from 'typeorm';

export class Class {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  class_id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  school_id: string;

  @Column({ type: 'varchar', length: 200 })
  teacher_id: string;

  @Column({ type: 'number', length: 200 })
  total_students: number;
}

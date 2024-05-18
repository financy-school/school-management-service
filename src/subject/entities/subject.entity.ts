import { PrimaryColumn, Column } from 'typeorm';

export class Subject {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  subject_id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'varchar', length: 200 })
  subject_code: string;

  @Column({ type: 'varchar', length: 200 })
  credit_hours: string;

  @Column({ type: 'varchar', length: 200 })
  semester: string;

  @Column({ type: 'varchar', length: 200 })
  department: string;
}

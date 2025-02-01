import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('transportation')
export class Transportation {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  transportation_id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  school_id: string;

  @Column({ type: 'varchar', length: 200 })
  driver_id: string;

  @Column({ type: 'varchar', length: 200 })
  total_students: number;
}

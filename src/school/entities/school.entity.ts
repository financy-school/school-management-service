import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

import { Exclude } from 'class-transformer';

export enum USER_TYPE {}

@Entity('school')
export class SchoolEntity {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  school_id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  phone: string;

  @Column({ type: 'varchar', length: 200, default: null })
  address: string;

  @Column({ type: 'varchar', length: 200, default: null })
  email: string;

  @Column({ type: 'varchar', length: 200, default: null })
  website: string;

  @Column({ type: 'varchar', length: 200 })
  country: string;

  @Column({ type: 'varchar', length: 200 })
  state: string;

  @Column({ type: 'varchar', length: 200 })
  city: string;

  @Column({ type: 'varchar', length: 200 })
  registration_number: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

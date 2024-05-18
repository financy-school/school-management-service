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

  @Column({ type: 'varchar', length: 200 })
  country: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Academics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  medium: string;

  @Column()
  section: string;

  @Column()
  stream: string;

  @Column()
  shift: string;

  @Column()
  className: string;
}

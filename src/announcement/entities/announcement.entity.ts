import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  createdAt: Date;
}

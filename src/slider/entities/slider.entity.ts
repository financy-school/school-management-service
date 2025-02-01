import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Slider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imageUrl: string;

  @Column()
  linkUrl: string; // Optional URL when clicked
}

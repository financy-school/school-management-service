import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { array: true })
  images: string[]; // Store image URLs

  @Column('text', { array: true })
  youtubeLinks: string[]; // Store YouTube video URLs
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { NoteImage } from 'src/modules/note_image/domain/note_images.entity'

@Entity({ name: 'notes' })
export class Note {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => NoteImage,
    (noteImage: NoteImage) => noteImage.note,
  )
  images?: NoteImage[]
}

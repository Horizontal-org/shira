import { Note } from 'src/modules/note/domain/note.entity'
import { Quiz } from 'src/modules/quiz/domain/quiz.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm'

@Entity({ name: 'note_images' })
export class NoteImage {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ name: 'relative_path' })
  relativePath: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date

  // RELATIONS
  @ManyToOne(
    () => Note,
    (note: Note) => note.images,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'note_id' })
  note?: Note

  @Column({ name: 'note_id', nullable: true })
  @RelationId((noteImage: NoteImage) => noteImage.note)
  noteId?: number

  @ManyToOne(
    () => Quiz,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'quiz_id' })
  quiz?: Quiz

  @Column({ name: 'quiz_id' })
  @RelationId((noteImage: NoteImage) => noteImage.quiz)
  quizId?: number
}

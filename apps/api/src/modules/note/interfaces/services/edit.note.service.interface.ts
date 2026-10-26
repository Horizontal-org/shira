import { EditNoteDto } from "../../dto/edit.note.dto";

export interface IEditNoteService {
  execute(editNoteDto: EditNoteDto): Promise<void>;
}

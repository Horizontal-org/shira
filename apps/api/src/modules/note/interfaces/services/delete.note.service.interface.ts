import { DeleteNoteDto } from "../../dto/delete.note.dto";

export interface IDeleteNoteService {
  execute(deleteDto: DeleteNoteDto): Promise<void>;
}

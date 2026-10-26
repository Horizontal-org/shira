import { CreateNoteDto } from "../../dto/create.note.dto";

export interface ICreateNoteService {
  execute(createNoteDto: CreateNoteDto): Promise<void>;
}

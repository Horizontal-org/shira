export interface IGetNoteService {
  execute(id: number): Promise<{ id: number; name: string; content: string }>
}

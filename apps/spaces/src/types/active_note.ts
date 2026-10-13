export interface ActiveNote {
  name: string;
  content: NoteEditorInput;
}

export interface NoteEditorInput {
  value: string
  htmlId: string;
  contentType: 'editor'
}

export const activeNoteDefault: ActiveNote = {
  name: '',
  content: {
    value: '',
    htmlId: 'component-text-1',
    contentType: 'editor'
  }
}


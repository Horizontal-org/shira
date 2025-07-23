export interface ImageObject {
  url: string;
  id: string;
  originalFilename: string;
}

export interface MessagingDragItem {
  position: number;
  value: string | ImageObject;
  name: string;
  type: string
}
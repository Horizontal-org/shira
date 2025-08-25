// export interface ImageObject {
//   url: string;
//   id: string;
//   originalFilename: string;
// }

export interface MessagingDragItem {
  draggableId: string;
  position: number;
  // value: string | ImageObject;
  name: string;
  type: string;
  explId?: number
}
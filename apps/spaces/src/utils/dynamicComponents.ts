import { ReactElement } from "react"

export interface Component {
  node: ReactElement
  type: string
  position: number
  content?: string
  dataPosition?: number
}


export const componentOptions = (type) => {  
  if (type === 'email') {
    return [
      {
        id: 'text',
        label: 'Body (max 1)',
        limit: 1
      },
      {
        id: 'attachment',
        label: 'Attachment (max 5)',
        limit: 5
      }
    ]
  }

  if (type === 'messaging') {
    return [
      {
        id: 'text',
        label: 'Message (max 5)',
        limit: 5
      },
      {
        id: 'attachment',
        label: 'Attachment (max 5)',
        limit: 5
      }
    ]
  }

  return []
}
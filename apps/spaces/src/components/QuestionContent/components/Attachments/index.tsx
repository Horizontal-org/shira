import { FunctionComponent, useEffect, useState } from "react";
import { AddAttachmentModal, Button, styled, Attachment, AttachmentType } from "@shira/ui";
import { IoMdAdd } from "react-icons/io";
import { DraggableAttachmentList } from "./DraggableAttachmentList";
import { QuestionDragAttachment } from "../../../../store/types/active_question";

interface Props { 
  onChange: (persistentList: QuestionDragAttachment[]) => void
  files?: QuestionDragAttachment[]
  content: Object
  // onChangeList: (f: AttachmentFile[]) => void
  // startAttachments?: AttachmentFile[] 
}

// const componentFinalId = `component-attachment-${componentId}`
// const { parseCustomElement } = useParseHTML(initialContent)
// const parseHtml = () => {
//   const attachmentExplanation = inputRef.current.getAttribute('data-explanation')
//   const explanation = attachmentExplanation ? ` data-explanation='${attachmentExplanation}' ` : ''  
//   const position = ` data-position=${componentPosition} `
//   setContent(componentFinalId, `<span ${explanation}${position}id='${componentFinalId}'>${inputRef.current.value}</span>`)
// }
// interface File {
//   id: number;
//   type: AttachmentType;
//   name: string;
// }


// onDelete={() => {
//   const newComponents = components.filter(cf => cf.position !== c.position)                
//   handleComponents(newComponents)
//   setLastIndex(newComponents.length)
//   deleteExplanations(c.position, c.type)
//   deleteContent(`component-${c.type}-${c.position}`)
// }}

export const Attachments: FunctionComponent<Props> = ({
  onChange,  
  files,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState('')
  const [fileType, setFileType] = useState(AttachmentType.document)

  const clean = () => {
    setFileName('')
    setFileType(AttachmentType.document)
  }

  return (
    <div>
      <AddAttachmentButtonWrapper>
        <Button 
          onClick={() => setIsOpen(true)}
          text="Add attachment"
          type="outline"    
          leftIcon={<IoMdAdd color="#5F6368" size={14}/>}        
        />
      </AddAttachmentButtonWrapper>

      <DraggableAttachmentList
        items={files}
        onChange={(newItems) => {
          onChange(newItems)        
        }}
      />

      <AddAttachmentModal 
        fileName={fileName} 
        handleFileName={setFileName}
        fileType={fileType}
        handleFileType={setFileType}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={() => {              
          const newName = `component-attachment-${files.length + 1}`
          const newFile: QuestionDragAttachment = {
            htmlId: newName,
            contentType: 'attachment',
            explanation: null,
            position: files.length + 1,
            draggableId: crypto.randomUUID(),
            value: {
              name: fileName,
              type: fileType
            }
          }

          onChange(files.concat([newFile]))
          clean()
        }}
      />
    </div>
  )
}

const AddAttachmentButtonWrapper = styled.div`
  margin-bottom: 24px;
`
import { FunctionComponent, useEffect, useState } from "react";
import { AddAttachmentModal, Button, styled, Attachment, AttachmentType } from "@shira/ui";
import { IoMdAdd } from "react-icons/io";
import { AttachmentWithExplanation } from "../../../AttachmentWithExplanation";


export interface AttachmentFile {
  id: number;
  type: AttachmentType;
  name: string;
  explanationIndex?: number
}

interface Props { 
  onChange: (persistentList: AttachmentFile[], f: AttachmentFile) => void
  files?: AttachmentFile[]
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
  files  
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
      <Button 
        onClick={() => setIsOpen(true)}
        text="Add attachment"
        type="outline"    
        leftIcon={<IoMdAdd color="#5F6368" size={14}/>}        
      />

      <AttachmentsWrapper>
        { files.map((f, k) => (
          <AttachmentWithExplanation
            key={k}
            file={f}
            onChange={(fileToSave) => {
              const persistentList = files.map((fm) => {
                if(fm.id === fileToSave.id) {
                  return fileToSave
                }
                return fm
              })
              onChange(persistentList, fileToSave)
            }}
            onDelete={() => {            
              onChange(files.filter(fil => fil.id !== f.id), null)
            }}
          />
        ))}
      </AttachmentsWrapper>
                  
      <AddAttachmentModal 
        fileName={fileName} 
        handleFileName={setFileName}
        fileType={fileType}
        handleFileType={setFileType}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={() => {              
          const newFile = {
            id: files.length > 0 ? files[files.length -1].id + 1 : 1,
            name: fileName,
            type: fileType
          }

          onChange(files.concat([newFile]), newFile)
          clean()
        }}
      />
    </div>
  )
}

const AttachmentsWrapper = styled.div`
  padding: 24px 0; 
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`
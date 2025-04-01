import { FunctionComponent, useState } from "react";
import { AddAttachmentModal, Button, styled, Attachment, AttachmentType } from "@shira/ui";
import { IoMdAdd } from "react-icons/io";

interface Props {

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

export const Attachments: FunctionComponent<Props> = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState('')
  const [fileType, setFileType] = useState('Document')

  const clean = () => {
    setFileName('')
    setFileType('')
  }

  const [files, handleFiles] = useState([])

  return (
    <div>
       <div>
          <Button 
            onClick={() => setIsOpen(true)}
            text="Add attachment"
            type="outline"    
            leftIcon={<IoMdAdd color="#5F6368" size={14}/>}        
          />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            { files.map((f) => (
              <Attachment
                key={f.id}
                name={f.name}
                type={f.type}
                showExplanations={true}
                onDelete={() => {}}
              />
            ))}
          </div>
                      
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

              handleFiles(prevArray => [...prevArray, newFile])
              clean()
            }}
          />
        </div>
    </div>
  )
}
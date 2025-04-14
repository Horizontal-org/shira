import { FunctionComponent, useEffect, useState } from "react";
import { AddAttachmentModal, Button, styled, Attachment, AttachmentType } from "@shira/ui";
import { IoMdAdd } from "react-icons/io";

interface Props { 
  onChange: () => void
}

interface File {
  id: number;
  type: AttachmentType;
  name: string;
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
  onChange
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState('')
  const [fileType, setFileType] = useState(AttachmentType.document)
  const [files, handleFiles] = useState<File[]>([])

  const clean = () => {
    setFileName('')
    setFileType(AttachmentType.document)
  }
  
  useEffect(() => {

  }, [files])

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
          <Attachment
            key={k}
            name={f.name}
            isActiveExplanation={true}
            type={f.type}
            showExplanations={true}
            onDelete={() => {
              console.log('hereher')
              handleFiles(files.filter(fil => fil.id !== f.id))
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

          handleFiles(prevArray => [...prevArray, newFile])
          clean()
          
        }}
      />
    </div>
  )
}

  // <ExplanationButton
  //         active={ref.current && selectedExplanationIndex + '' == ref.current.getAttribute('data-explanation')}
  //         onClick={() => {
  //           const hasExplanation = ref.current.getAttribute('data-explanation')
  //           if (hasExplanation) {
  //             changeSelected(parseInt(hasExplanation))
  //           } else {
  //             const index = explanationIndex + 1
  //             ref.current.setAttribute('data-explanation', index + '')
  //             addExplanation(index, label)
  //             onChange(
  //               index,
  //               ref.current.value,
  //             )
  //           }
  //         }}
  //       />

const AttachmentsWrapper = styled.div`
  padding: 24px 0; 
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`
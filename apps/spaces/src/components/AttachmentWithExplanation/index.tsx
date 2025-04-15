import { FunctionComponent } from "react";
import { Attachment, styled } from "@shira/ui";
import { AttachmentFile } from "../QuestionContent/components/Attachments";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";

// key={k}
// name={f.name}
// onExplanationClick={() => {
//   const hasExplanation = selectedExplanationIndex === f.explanationIndex
//   if (hasExplanation) {
//     changeSelected(f.explanationIndex)
//   } else {
//     const index = explanationIndex + 1
//     // ref.current.setAttribute('data-explanation', index + '')
//     addExplanation(index, f.name)

//   }
// }}
// isActiveExplanation={selectedExplanationIndex === f.explanationIndex}
// type={f.type}
// onDelete={() => {
//   handleFiles(files.filter(fil => fil.id !== f.id))
// }}
interface Props {
  file: AttachmentFile
  onDelete: (id: number) => void
  onChange: (file: AttachmentFile) => void
}

export const AttachmentWithExplanation:FunctionComponent<Props> = ({
  file,
  onDelete,
  onChange
}) => {

  const {
    addExplanation,
    explanationIndex,
    selectedExplanationIndex,
    changeSelected
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    selectedExplanationIndex: state.selectedExplanation,
    changeSelected: state.changeSelected
  }), shallow)
  
  return (
    <Attachment 
      name={file.name}
      onExplanationClick={() => {
        const hasExplanation = selectedExplanationIndex === file.explanationIndex
        if (hasExplanation) {
          changeSelected(file.explanationIndex)
        } else {
          const index = explanationIndex + 1
          onChange({
            ...file,
            explanationIndex: index 
          })
          addExplanation(index, file.name)
        }
      }}
      isActiveExplanation={selectedExplanationIndex === file.explanationIndex} 
      type={file.type}
      onDelete={() => {
        onDelete(file.id)
      }}
    />
  )
}
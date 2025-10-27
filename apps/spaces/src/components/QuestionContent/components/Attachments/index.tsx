import { FunctionComponent, useState } from "react";
import { AddAttachmentModal, Button, styled, AttachmentType } from "@shira/ui";
import { IoMdAdd } from "react-icons/io";
import { DraggableAttachmentList } from "./DraggableAttachmentList";
import { QuestionDragAttachment } from "../../../../store/types/active_question";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: (persistentList: QuestionDragAttachment[]) => void
  files?: QuestionDragAttachment[]
  content: Object
}

export const Attachments: FunctionComponent<Props> = ({
  onChange,
  files,
}) => {
  const { t } = useTranslation();

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
          text={t("create_question.tabs.content.attachment_button")}
          type="outline"
          leftIcon={<IoMdAdd color="#5F6368" size={14} />}
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
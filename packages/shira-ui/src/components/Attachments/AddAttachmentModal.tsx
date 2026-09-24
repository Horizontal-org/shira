import { TextInput } from '../TextInput';
import { SelectComponent } from '../Select';
import { Modal, ModalType } from '../Modal';
import { AttachmentType } from './Attachment';
import { Body3 } from '../Typography';
import styled from 'styled-components'

export interface AddAttachmentModalProps {
  fileName: string;
  handleFileName: (fileName: string) => void;
  fileType: AttachmentType;
  handleFileType: (fileType: AttachmentType) => void;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;

  titleLabel?: string;
  saveLabel?: string;
  cancelLabel?: string;
  fileNameLabel?: string;
  fileTypeLabel?: string;
  fileTypeExplanation?: string;
  fileTypePlaceholder?: string;
  typeLabels?: Partial<Record<AttachmentType, string>>;
  excludedFileTypes?: AttachmentType[];
}

const ATTACHMENT_FILENAME_MAX_LENGTH = 100;

export const AddAttachmentModal = ({
  fileName,
  handleFileName,
  fileType,
  handleFileType,
  isOpen,
  onClose,
  onSave,
  titleLabel,
  saveLabel,
  cancelLabel,
  fileNameLabel,
  fileTypeLabel,
  fileTypeExplanation,
  excludedFileTypes
}: AddAttachmentModalProps) => {
  const trimmedFileName = fileName.trim();
  const disabledSave =
    trimmedFileName.length === 0
    || trimmedFileName.length > ATTACHMENT_FILENAME_MAX_LENGTH;

  const fileTypeOptions = [
    { value: AttachmentType.image, label: 'Image (.jpg, .png, .gif, ...)' },
    { value: AttachmentType.video, label: 'Video (.mp4, .avi, .mov, ...)' },
    { value: AttachmentType.audio, label: 'Audio (.mp3, .wav, .m4a, ...)' },
    { value: AttachmentType.document, label: 'Document (.docx, .xlsx, .pdf, .txt, ...)' },
    { value: AttachmentType.archive, label: 'Archive (.zip, .rar)' },
    { value: AttachmentType.other, label: 'Other' }
  ];

  return (
    <Modal
      id="add-attachment-modal"
      isOpen={isOpen}
      title={titleLabel}
      primaryButtonText={saveLabel}
      secondaryButtonText={cancelLabel}
      primaryButtonDisabled={disabledSave}
      onPrimaryClick={() => {
        if (disabledSave) { return; }
        onSave()
        onClose()
      }}
      onSecondaryClick={onClose}
      type={ModalType.Primary}
    >
      <Body3>{fileTypeExplanation}</Body3>
      <ChildrenContainer>
        <TextInput
          id="file-name-input"
          label={fileNameLabel}
          value={fileName}
          onChange={(e) => handleFileName(e.target.value)}
          showCharacterCount={true}
          maxLength={ATTACHMENT_FILENAME_MAX_LENGTH}
          characterLimitErrorText="Character limit exceeded."
        />
        <SelectComponent
          label={fileTypeLabel}
          options={fileTypeOptions.filter(it => excludedFileTypes === undefined || !excludedFileTypes.includes(it.value))}
          onChange={handleFileType}
          value={fileType}
        />
      </ChildrenContainer>
    </Modal>

  );
};

const ChildrenContainer = styled.div`
  margin-top: 1rem;
`
export default AddAttachmentModal;

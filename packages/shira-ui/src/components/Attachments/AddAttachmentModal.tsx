import { TextInput } from '../TextInput';
import { SelectComponent } from '../Select';
import { Modal, ModalType } from '../Modal';
import { AttachmentType } from './Attachment';

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
  fileTypePlaceholder?: string;
  typeLabels?: Partial<Record<AttachmentType, string>>;
}

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
  fileTypeLabel
}: AddAttachmentModalProps) => {

  const fileTypeOptions = [
    { value: AttachmentType.image, label: 'Image' },
    { value: AttachmentType.video, label: 'Video' },
    { value: AttachmentType.audio, label: 'Audio' },
    { value: AttachmentType.document, label: 'Document' },
    { value: AttachmentType.other, label: 'Other' }
  ];

  return (
    <Modal
      id="add-attachment-modal"
      isOpen={isOpen}
      title={titleLabel}
      primaryButtonText={saveLabel}
      secondaryButtonText={cancelLabel}
      onPrimaryClick={() => {
        onSave()
        onClose()
      }}
      onSecondaryClick={onClose}
      type={ModalType.Primary}
    >
      <div>
        <TextInput
          id="file-name-input"
          label={fileNameLabel}
          value={fileName}
          onChange={(e) => handleFileName(e.target.value)}
        />
        <SelectComponent
          label={fileTypeLabel}
          options={fileTypeOptions}
          onChange={handleFileType}
          value={fileType}
        />
      </div>
    </Modal>

  );
};

export default AddAttachmentModal;
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
}

export const AddAttachmentModal = ({ 
  fileName, 
  handleFileName, 
  fileType,
  handleFileType,
  isOpen,
  onClose, 
  onSave
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
      isOpen={isOpen}
      title="Add attachment"
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      onPrimaryClick={() => {
        onSave()
        onClose()
      }}
      onSecondaryClick={onClose}
      type={ModalType.Primary}
    >
      <div>
        <TextInput
          label="File name"
          value={fileName}
          onChange={(e) => handleFileName(e.target.value)}
        />
        <SelectComponent 
          label="File Type"
          options={fileTypeOptions}
          onChange={handleFileType}
          value={fileType}
        />
      </div>
    </Modal>

  );
};




export default AddAttachmentModal;
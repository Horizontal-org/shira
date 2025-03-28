import { TextInput } from '../TextInput';
import { SelectComponent } from '../Select';
import { Modal, ModalType } from '../Modal';

export interface AttachmentProps {
  fileName: string;
  handleFileName: (fileName: string) => void;
  fileType: string;
  handleFileType: (fileType: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const Attachment = ({ 
  fileName, 
  handleFileName, 
  fileType,
  handleFileType,
  isOpen,
  onClose, 
  onSave
}: AttachmentProps) => {
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
          options={['Image', 'Video', 'Audio', 'Document', 'Other']}
          onChange={(value) => handleFileType(value)}
          value={fileType}
        />
      </div>
    </Modal>

  );
};




export default Attachment;
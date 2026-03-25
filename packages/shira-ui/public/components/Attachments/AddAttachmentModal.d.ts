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
export declare const AddAttachmentModal: ({ fileName, handleFileName, fileType, handleFileType, isOpen, onClose, onSave, titleLabel, saveLabel, cancelLabel, fileNameLabel, fileTypeLabel }: AddAttachmentModalProps) => import("react/jsx-runtime").JSX.Element;
export default AddAttachmentModal;

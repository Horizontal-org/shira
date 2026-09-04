import { Modal, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { FileDropzone } from "../../FileDropzone";
import { DroppedFileInfo } from "../../FileDropzone/components/DroppedFileInfo";
import { FaRegFileZipper } from "react-icons/fa6";
import { importEntity, importQuiz } from "../../../fetch/quiz";
import { handleHttpError } from "../../../fetch/handleError";

const MAX_ZIP_FILE_SIZE_BYTES = 50 * 1024 * 1024;

interface Props {
  entityType: 'question' | 'quiz';
  quizId?: number;
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
  onImportSuccess: (id: number) => void;
}

export const ImportEntityModal: FunctionComponent<Props> = ({
  entityType,
  quizId,
  isModalOpen,
  setIsModalOpen,
  onImportSuccess,
}) => {

  const { t } = useTranslation();
  const [error, handleError] = useState<string | null>(null);
  const [file, handleFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const onPrimary = async () => {
    if (!file) return

    setIsImporting(true)
    try {
      if (entityType === 'quiz') {
        const { quizId: importedQuizId } = await importQuiz(file)
        toast.success(t('success_messages.quiz_imported'), { duration: 3000 })
        onImportSuccess(importedQuizId)
      } else {
        const { questionId } = await importEntity(quizId as number, file)
        toast.success(t('success_messages.question_imported'), { duration: 3000 })
        onImportSuccess(questionId)
      }
      handleClose()
    } catch (err) {
      const { message } = handleHttpError(err)
      handleError(message ?? "unknown_error")
    } finally {
      setIsImporting(false)
    }
  }

  const onFileChange = (selectedFile: File) => {
    handleFile(selectedFile)

    if (selectedFile.size > MAX_ZIP_FILE_SIZE_BYTES) {
      handleError("file_too_large");
      return;
    }

  }

  const clean = () => {
    handleError(null)
    handleFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleClose = () => {
    setIsModalOpen(false);
    clean()
  };

  return (
    <Modal
      id="import-entity-modal"
      size="medium"
      isOpen={isModalOpen}
      title={t(`modals.import.${entityType}.title`)}
      subtitle={t(`modals.import.${entityType}.subtitle`)}
      primaryButtonText={isImporting ? t(`modals.import.${entityType}.importing`) : t(`modals.import.${entityType}.button`)}
      primaryButtonDisabled={!file || !!(error) || isImporting}
      secondaryButtonText={!!(error) ? t('buttons.try_again') : t('buttons.cancel')}
      onPrimaryClick={!error && onPrimary}
      onSecondaryClick={!!(error) ? clean : handleClose}
      onClose={handleClose}
    >
      <>
        {file ? (
          <>
            <Separator />
            <FileInfoWrapper>
              <DroppedFileInfo
                icon={<FaRegFileZipper size={20} />}
                showUploadSuccess={false}
                showTryAgainButton={false}
                size='big'
                file={file}
                dropLoading={isImporting}
                dropFailed={!!(error)}
                onClearFile={clean}
                labels={{
                  removeFile: t("learners_bulk_import.tabs.upload_csv.remove_file"),
                  uploading: t("learners_bulk_import.tabs.upload_csv.uploading"),
                  uploadSuccess: t(`modals.import.${entityType}.upload_success`),
                  uploadComplete: t("learners_bulk_import.tabs.upload_csv.upload_complete"),
                  errorTitle: t(`error_messages.entity_import.${error}.title`, {
                    defaultValue: t(`error_messages.something_went_wrong`),
                  }),
                  errorSubtitle: t(`error_messages.entity_import.${error}.subtitle`, {
                    defaultValue: t(`error_messages.something_went_wrong`),
                  })
                }}
              />
            </FileInfoWrapper>
          </>
        ) : (
          <FileDropzone
            title={t(`modals.import.${entityType}.drag_title`)}
            acceptedFileTypesLabel={t(`modals.import.${entityType}.file_type`)}
            acceptedFileTypes=".zip"
            acceptedFileSize={t(`modals.import.${entityType}.file_size`)}
            fileInputRef={fileInputRef}
            onFileChange={onFileChange}
          />
        )}
      </>

    </Modal>
  )
}

const Separator = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.dark.mediumGrey};
  width: 100%;
`

const FileInfoWrapper = styled.div`
  min-height: 310px;
  height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
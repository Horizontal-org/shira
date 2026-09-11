import { DragEvent, FunctionComponent, KeyboardEvent, RefObject } from "react";
import { Body1, Body2Regular, Body3, Body4, Button, H2, LoadingIcon, SubHeading1, SubHeading3, defaultTheme, styled, useTheme } from "@horizontal-org/shira-ui";
import { useTranslation } from "react-i18next";
import { FaFileUpload } from "react-icons/fa";
import { FiCheck, FiDownload, FiInfo } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { GoAlertFill } from "react-icons/go";
import { FileDropzone } from "../../../FileDropzone";
import { DroppedFileInfo } from "../../../FileDropzone/components/DroppedFileInfo";

interface Props {
  selectedFile: File | null;
  isFileLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (file: File | null) => void;
  onClearFile: () => void;
  onOpenGuidelines: () => void;
  uploadError: string | null;
}

export const UploadCsvStep: FunctionComponent<Props> = ({
  selectedFile,
  isFileLoading,
  fileInputRef,
  onFileChange,
  onClearFile,
  onOpenGuidelines,
  uploadError,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const templateFileName = "learner-bulk-import-template.csv";
  const templateFilePath = `/${templateFileName}`;

  const onDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = templateFilePath;
    link.download = templateFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <UploadCard>
      <H2 id="learner-bulk-import-header">
        {t("learners_bulk_import.tabs.upload_csv.tab_title")}
      </H2>

      <Subtitle id="learner-bulk-import-subtitle">
        <Body1>{t("learners_bulk_import.tabs.upload_csv.subtitle")}</Body1>
      </Subtitle>

      <ActionRow>
        <Button
          id="bulk-import-download-template"
          text={t("buttons.download_template")}
          type="primary"
          color={theme.colors.green7}
          leftIcon={<FiDownload size={18} />}
          onClick={onDownloadTemplate}
          disabled={isFileLoading}
        />
        <Button
          id="bulk-import-view-guidelines"
          text={t("buttons.view_guidelines")}
          type="outline"
          leftIcon={<FiInfo size={18} />}
          onClick={onOpenGuidelines}
          disabled={isFileLoading}
        />
      </ActionRow>

      <Divider />

      {!selectedFile ? (
        <>
          <SectionTitle>
            <SubHeading1>
              {t("learners_bulk_import.tabs.upload_csv.section_title")}
            </SubHeading1>
          </SectionTitle>

          <FileDropzone
            title={t("learners_bulk_import.tabs.upload_csv.drag_title")}
            acceptedFileTypes=".csv"
            acceptedFileTypesLabel={t("learners_bulk_import.tabs.upload_csv.file_type")}
            acceptedFileSize={t("learners_bulk_import.tabs.upload_csv.file_size")}
            fileInputRef={fileInputRef}
            onFileChange={onFileChange}
          />

        </>
      ) : (
        <DroppedFileInfo
          icon={<BiSolidSpreadsheet size={20} />}
          file={selectedFile}
          dropLoading={isFileLoading}
          dropFailed={!!(uploadError && selectedFile)}
          onClearFile={onClearFile}
          labels={{
            removeFile: t("learners_bulk_import.tabs.upload_csv.remove_file"),
            uploading: t("learners_bulk_import.tabs.upload_csv.uploading"),
            uploadSuccess: t("learners_bulk_import.tabs.upload_csv.upload_success"),
            uploadComplete: t("learners_bulk_import.tabs.upload_csv.upload_complete"),
            errorTitle: t(`error_messages.learners_bulk_import.${uploadError}.title`, {
              defaultValue: t(`error_messages.something_went_wrong`),
            }),
            errorSubtitle: t(`error_messages.learners_bulk_import.${uploadError}.subtitle`, {
              defaultValue: t(`error_messages.something_went_wrong`),
            })
          }}
        />
      )}
    </UploadCard>
  );
};

const UploadCard = styled.div`
  width: 1024px;
  max-width: 100%;
  background: ${(props) => props.theme.colors.light.white};
  border-radius: 24px;
  padding: 40px;
`;

const Subtitle = styled.div`
  margin: 10px 0;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.colors.dark.lightGrey};
  margin: 32px 0;
`;

const SectionTitle = styled.div`
  margin-bottom: 16px;
`;


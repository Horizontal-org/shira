import { DragEvent, FunctionComponent, KeyboardEvent, RefObject } from "react";
import { Body1, Body2Regular, Body4, Button, H2, SubHeading1, SubHeading3, defaultTheme, styled, useTheme } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { FaFileUpload } from "react-icons/fa";
import { FiCheck, FiDownload, FiInfo } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { GoAlertFill } from "react-icons/go";

interface Props {
  selectedFile: File | null;
  isFileLoading: boolean;
  isDragging: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  onBrowseClick: () => void;
  onDropzoneKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onFileChange: (file: File | null) => void;
  onClearFile: () => void;
  onOpenGuidelines: () => void;
  uploadError: string | null;
}

export const UploadCsvStep: FunctionComponent<Props> = ({
  selectedFile,
  isFileLoading,
  isDragging,
  fileInputRef,
  onBrowseClick,
  onDropzoneKeyDown,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileChange,
  onClearFile,
  onOpenGuidelines,
  uploadError,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const templateFileName = "learner-bulk-import-template.csv";
  const templateFilePath = `/${templateFileName}`;

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

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

          <Dropzone
            id="dropzone"
            role="button"
            tabIndex={0}
            $isDragging={isDragging}
            onClick={onBrowseClick}
            onKeyDown={onDropzoneKeyDown}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              hidden
              onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
            />

            <DropzoneContent>
              <FaFileUpload size={56} color={theme.colors.blue4} />

              <DropzoneText>
                <SubHeading3>
                  {t("learners_bulk_import.tabs.upload_csv.drag_title")}
                </SubHeading3>
              </DropzoneText>

              <Body2Regular color={theme.colors.dark.mediumGrey}>
                {t("learners_bulk_import.tabs.upload_csv.or")}
              </Body2Regular>

              <Button
                id="bulk-import-browse-files"
                text={t("buttons.browse_files")}
                type="outline"
                onClick={(event) => {
                  event.stopPropagation();
                  onBrowseClick();
                }}
              />

              <DropzoneInfo>
                <Body4>{t("learners_bulk_import.tabs.upload_csv.file_type")}</Body4>
                <Body4>{t("learners_bulk_import.tabs.upload_csv.file_size")}</Body4>
              </DropzoneInfo>
            </DropzoneContent>
          </Dropzone>
        </>
      ) : isFileLoading ? (
        <>
          <CenteredHeaderRow>
            <LoadingIcon />
            <SubHeading1>{t("loading_messages.loading")}</SubHeading1>
          </CenteredHeaderRow>

          <CenteredBodyColumn>
            <SelectedFileCard $isLoading aria-busy="true">
              <FileIcon>
                <BiSolidSpreadsheet size={20} />
              </FileIcon>

              <FileInfo>
                <FileName title={selectedFile.name}>{selectedFile.name}</FileName>
              </FileInfo>

              <FileMeta>
                <Body2Regular>{formatFileSize(selectedFile.size)}</Body2Regular>
              </FileMeta>

              <RemoveButton
                type="button"
                aria-label={t("learners_bulk_import.tabs.upload_csv.remove_file")}
                disabled
                onClick={(event) => {
                  event.stopPropagation();
                  onClearFile();
                }}
              >
                <IoIosCloseCircle size={26} />
              </RemoveButton>
            </SelectedFileCard>

            <CenteredText>
              <Body2Regular>
                {t("learners_bulk_import.tabs.upload_csv.uploading")}
              </Body2Regular>
            </CenteredText>
          </CenteredBodyColumn>
        </>
      ) : uploadError && selectedFile ? (
        <>
          <CenteredHeaderRow>
            <GoAlertFill size={20} color={defaultTheme.colors.error7} />
            <SubHeading1>
              {t(`error_messages.learners_bulk_import.${uploadError}.title`, {
                defaultValue: t(`error_messages.something_went_wrong`),
              })}
            </SubHeading1>
          </CenteredHeaderRow>

          <CenteredBodyColumn>
            <SelectedFileCard>
              <FileIcon>
                <BiSolidSpreadsheet size={20} />
              </FileIcon>

              <FileInfo>
                <FileName title={selectedFile.name} $isDisabled>
                  {selectedFile.name}
                </FileName>
              </FileInfo>

              <FileMeta>
                <Body2Regular>{formatFileSize(selectedFile.size)}</Body2Regular>
              </FileMeta>

              <RemoveButton
                type="button"
                aria-label={t("learners_bulk_import.tabs.upload_csv.remove_file")}
                onClick={(event) => {
                  event.stopPropagation();
                  onClearFile();
                }}
              >
                <IoIosCloseCircle size={26} />
              </RemoveButton>
            </SelectedFileCard>

            <CenteredText>
              <Body1>
                {t(`error_messages.learners_bulk_import.${uploadError}.subtitle`, {
                  defaultValue: t(`error_messages.something_went_wrong`),
                })}
              </Body1>
            </CenteredText>

            <Button
              id="bulk-import-try-again"
              text={t("buttons.try_again")}
              type="outline"
              onClick={onClearFile}
            />
          </CenteredBodyColumn>
        </>
      ) : (
        <>
          <CenteredHeaderRow>
            <CompleteIcon>
              <FiCheck size={18} />
            </CompleteIcon>
            <SubHeading1>
              {t("learners_bulk_import.tabs.upload_csv.upload_complete")}
            </SubHeading1>
          </CenteredHeaderRow>

          <CenteredBodyColumn>
            <SelectedFileCard>
              <FileIcon>
                <BiSolidSpreadsheet size={20} />
              </FileIcon>

              <FileInfo>
                <FileName title={selectedFile.name}>{selectedFile.name}</FileName>
              </FileInfo>

              <FileMeta>
                <Body2Regular>{formatFileSize(selectedFile.size)}</Body2Regular>
              </FileMeta>

              <RemoveButton
                type="button"
                aria-label={t("learners_bulk_import.tabs.upload_csv.remove_file")}
                onClick={(event) => {
                  event.stopPropagation();
                  onClearFile();
                }}
              >
                <IoIosCloseCircle size={26} />
              </RemoveButton>
            </SelectedFileCard>

            <MutedCenteredText>
              <Body2Regular>
                {t("learners_bulk_import.tabs.upload_csv.uploading")}
              </Body2Regular>
            </MutedCenteredText>
          </CenteredBodyColumn>
        </>
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

const CenteredHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const CenteredBodyColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const CenteredText = styled.div`
  text-align: center;
  max-width: ${(props) => props.theme.breakpoints.sm};
`;

const MutedCenteredText = styled(CenteredText)`
  color: ${(props) => props.theme.colors.dark.mediumGrey};
`;

const CompleteIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.light.white};
  background: ${(props) => props.theme.colors.green7};
`;

const LoadingIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    ${(props) => props.theme.colors.light.white} 0deg,
    ${(props) => props.theme.colors.green4} 160deg,
    ${(props) => props.theme.colors.green2} 300deg,
    ${(props) => props.theme.colors.light.white}
  );
  mask: radial-gradient(circle, transparent 54%, black 56%);
  -webkit-mask: radial-gradient(circle, transparent 54%, black 56%);
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Dropzone = styled.div<{ $isDragging: boolean }>`
  border-radius: 20px;
  border: 2px dashed ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.blue6 : theme.colors.blue4};
  background: ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.blue1 : theme.colors.blue0};
  padding: 32px;
  cursor: pointer;
`;

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const DropzoneText = styled.div`
  margin-top: 16px;
  color: ${(props) => props.theme.colors.dark.darkGrey};
`;

const DropzoneInfo = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.dark.darkGrey};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
`;

const SelectedFileCard = styled.div<{ $isLoading?: boolean }>`
  width: 100%;
  margin-top: 12px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.colors.dark.lightGrey};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  max-width: 520px;
  gap: 12px;
  background: ${(props) => props.theme.colors.light.white};
  opacity: ${(props) => (props.$isLoading ? 0.64 : 1)};
`;

const FileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.green7};
  background: ${(props) => props.theme.colors.light.paleGreen};
`;

const FileInfo = styled.div`
  flex: 1;
  text-align: left;
  color: ${(props) => props.theme.colors.dark.black};
  min-width: 0;
`;

const FileName = styled(Body2Regular) <{ $isDisabled?: boolean }>`
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.dark.lightGrey : theme.colors.dark.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileMeta = styled.div`
  color: ${(props) => props.theme.colors.dark.mediumGrey};
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.dark.mediumGrey};

  &:hover {
    color: ${(props) => props.theme.colors.dark.darkGrey};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.dark.lightGrey};
  }
`;

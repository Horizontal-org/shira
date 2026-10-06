import { Body2Regular, Body4, Button, styled, SubHeading3, useTheme } from "@horizontal-org/shira-ui";
import { FunctionComponent, useState, useRef, DragEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { FaFileUpload } from "react-icons/fa";

interface Props {
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (file: File | null) => void;
  title: string;
  acceptedFileTypes: string;
  acceptedFileTypesLabel: string;
  acceptedFileSize: string;
}

export const FileDropzone: FunctionComponent<Props> = ({
  fileInputRef,
  onFileChange,
  title,
  acceptedFileTypes,
  acceptedFileTypesLabel,
  acceptedFileSize
}) => {

  const { t } = useTranslation();
  const theme = useTheme();

  const [isDragging, setIsDragging] = useState(false);
  const dragEnterCount = useRef(0);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragEnterCount.current = 0;
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    onFileChange(file);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragEnterCount.current += 1;
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragEnterCount.current = Math.max(0, dragEnterCount.current - 1);
    if (dragEnterCount.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDropzoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBrowseClick();
    }
  };

  return (
    <Dropzone
      id="dropzone"
      role="button"
      tabIndex={0}
      $isDragging={isDragging}
      onClick={handleBrowseClick}
      onKeyDown={handleDropzoneKeyDown}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        hidden
        onChange={(event) => {
          onFileChange(event.target.files?.[0] ?? null);
          event.target.value = "";
        }}
      />

      <DropzoneContent>
        <FaFileUpload size={56} color={theme.colors.blue4} />

        <DropzoneText>
          <SubHeading3>
            {title}
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
            handleBrowseClick();
          }}
        />

        <DropzoneInfo>
          <Body4>{acceptedFileTypesLabel}</Body4>
          <Body4>{acceptedFileSize}</Body4>
        </DropzoneInfo>
      </DropzoneContent>
    </Dropzone>
  )
}


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

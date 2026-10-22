import { Body1, Body2Regular, Body3, Button, defaultTheme, LoadingIcon, styled, SubHeading1 } from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck } from "react-icons/fi";
import { GoAlertFill } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";

interface Props {
  showUploadSuccess?: boolean;
  showTryAgainButton?: boolean
  icon: ReactNode
  size?: 'medium' | 'big'
  file?: File | null;
  onClearFile: () => void;
  dropLoading: boolean
  dropFailed: boolean;
  labels: {
    removeFile: string;
    uploading: string;
    uploadSuccess: string;
    uploadComplete: string;
    errorTitle: string;
    errorSubtitle: string;
  }
}


export const DroppedFileInfo: FunctionComponent<Props> = ({
  dropLoading,
  dropFailed,
  icon,
  size = 'medium',
  file,
  onClearFile,
  labels,
  showUploadSuccess = true,
  showTryAgainButton = true
}) => {

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const { t } = useTranslation();

  if (!file) return null;

  const loadingBody = (
    <CenteredBodyColumn>
      <SelectedFileCard $isLoading aria-busy="true" $cardSize={size}>
        <FileIcon>
          {icon}
        </FileIcon>

        <FileInfo>
          <FileName title={file.name}>{file.name}</FileName>
        </FileInfo>

        <FileMeta>
          <Body2Regular>{formatFileSize(file.size)}</Body2Regular>
        </FileMeta>

        <RemoveButton
          type="button"
          aria-label={labels.removeFile}
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
          {labels.uploading}
        </Body2Regular>
      </CenteredText>
    </CenteredBodyColumn>
  )

  const errorBody = (
    <CenteredBodyColumn>
      <SelectedFileCard $cardSize={size}>
        <FileIcon>
          {icon}
        </FileIcon>

        <FileInfo>
          <FileName title={file.name} $isDisabled>
            {file.name}
          </FileName>
        </FileInfo>

        <FileMeta>
          <FileBody3>{formatFileSize(file.size)}</FileBody3>
        </FileMeta>

        <RemoveButton
          type="button"
          aria-label={labels.removeFile}
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
          {labels.errorSubtitle}
        </Body1>
      </CenteredText>

      {showTryAgainButton && (
        <Button
          text={t("buttons.try_again")}
          type="outline"
          onClick={onClearFile}
        />
      )}
    </CenteredBodyColumn>
  )


  const successBody = (
    <CenteredBodyColumn>
      <SelectedFileCard $cardSize={size}>
        <FileIcon>
          {icon}
        </FileIcon>

        <FileInfo>
          <FileName title={file.name}>{file.name}</FileName>
        </FileInfo>

        <FileMeta>
          <FileBody3>{formatFileSize(file.size)}</FileBody3>
        </FileMeta>

        <RemoveButton
          type="button"
          aria-label={labels.removeFile}
          onClick={(event) => {
            event.stopPropagation();
            onClearFile();
          }}
        >
          <IoIosCloseCircle size={26} />
        </RemoveButton>
      </SelectedFileCard>

      <Body1>
        {labels.uploadSuccess}
      </Body1>
    </CenteredBodyColumn>
  )
  return (
    <>
      <CenteredHeaderRow>
        {dropLoading ? (
          <>
            <LoadingIcon />
            <SubHeading1>{t("loading_messages.loading")}</SubHeading1>
          </>
        ) : dropFailed ? (
          <>
            <GoAlertFill size={20} color={defaultTheme.colors.error7} />
            <SubHeading1>
              {labels.errorTitle}
            </SubHeading1>
          </>
        ) : showUploadSuccess && (
          <>
            <CompleteIcon>
              <FiCheck size={18} />
            </CompleteIcon>
            <SubHeading1>
              {labels.uploadComplete}
            </SubHeading1>
          </>
        )}
      </CenteredHeaderRow>

      {dropLoading ? loadingBody : dropFailed ? errorBody : successBody}

    </>
  )
}

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

const SelectedFileCard = styled.div<{
  $isLoading?: boolean
  $cardSize: string
}>`
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

  ${props => props.$cardSize === 'big' && `
    padding: 20px;
    gap: 24px;
  `}
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
  text-align: start;
  color: ${(props) => props.theme.colors.dark.black};
  min-width: 0;
`;

const FileName = styled(Body2Regular) <{ $isDisabled?: boolean }>`
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.dark.darkGrey : theme.colors.dark.black};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.64 : 1)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileMeta = styled.div`
  white-space: nowrap;
`;

const FileBody3 = styled(Body3)`
  color: ${(props) => props.theme.colors.dark.darkGrey};
  font-size: 14px;
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




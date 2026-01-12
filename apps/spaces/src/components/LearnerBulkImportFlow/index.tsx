import { DragEvent, FunctionComponent, KeyboardEvent, useRef, useState } from "react";
import { Breadcrumbs, styled, BetaBanner, Button, Body1, Body2Regular, H2, useTheme, Body3, Body3Bold, Body4, SubHeading1, SubHeading3 } from "@shira/ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LearnerBulkImportHeader } from "../LearnerBulkImportHeader";
import { ExitLearnerBulkImportModal } from "../modals/ExitLearnerBulkImportModal";
import { FormattingGuidelinesModal } from "../modals/FormattingGuidelinesModal";
import { Learner } from "../LearnerQuizView";
import { FiDownload, FiInfo } from "react-icons/fi";
import { FaFileUpload } from "react-icons/fa";

interface Props {
  onSubmit: (learners: Learner[]) => void;
}

export const LearnerBulkImportFlow: FunctionComponent<Props> = ({
  onSubmit,
}) => {

  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [step, handleStep] = useState(0);

  const [isExitBulkImportModalOpen, setIsExitBulkImportModalOpen] = useState(false);
  const [isFormattingGuidelinesOpen, setIsFormattingGuidelinesOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateStep = () => {
    if (step === 0) {
      return !!selectedFile;
    }

    return true;
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] ?? null;
    handleFileChange(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDropzoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBrowseClick();
    }
  };

  return (
    <>
      <ExitLearnerBulkImportModal
        isModalOpen={isExitBulkImportModalOpen}
        setIsModalOpen={setIsExitBulkImportModalOpen}
        onConfirm={() => {
          navigate(-1);
        }}
      />
      <FormattingGuidelinesModal
        isModalOpen={isFormattingGuidelinesOpen}
        setIsModalOpen={setIsFormattingGuidelinesOpen}
      />

      <BetaBanner url="/support" />

      <LearnerBulkImportHeader
        onNext={() => {
          if (step === 2) {
            onSubmit([]);
            return;
          }
          handleStep(step + 1);
        }}
        onBack={() => {
          if (step === 0) {
            setIsExitBulkImportModalOpen(true);
          } else {
            handleStep(step - 1);
          }
        }}
        step={step}
        disableNext={!validateStep() && selectedFile == null}
        onExit={() => {
          setIsExitBulkImportModalOpen(true);
        }}
      />

      <Container>
        <ContentWrapper>
          <div>
            <ContentHeader id="content-header">
              <Breadcrumbs
                active={step}
                items={[
                  { text: t('learners_bulk_import.tabs.upload_csv.tab_title') },
                  { text: t('learners_bulk_import.tabs.verify_learners.tab_title') },
                  { text: t('learners_bulk_import.tabs.final_review.tab_title') }
                ]}
              />
            </ContentHeader>

            {step === 0 && (
              <UploadCard>
                <H2>{t('learners_bulk_import.tabs.upload_csv.tab_title')}</H2>
                <Subtitle>
                  <Body1>{t('learners_bulk_import.tabs.upload_csv.subtitle')}</Body1>
                </Subtitle>
                <ActionRow>
                  <Button
                    id="bulk-import-download-template"
                    text={t('buttons.download_template')}
                    type="primary"
                    color={theme.colors.green7}
                    leftIcon={<FiDownload size={18} />}
                  />
                  <Button
                    id="bulk-import-view-guidelines"
                    text={t('buttons.view_guidelines')}
                    type="outline"
                    leftIcon={<FiInfo size={18} />}
                    onClick={() => setIsFormattingGuidelinesOpen(true)}
                  />
                </ActionRow>

                <Divider />

                <SectionTitle>
                  <SubHeading1>{t('learners_bulk_import.tabs.upload_csv.section_title')}</SubHeading1>
                </SectionTitle>
                <Dropzone
                  role="button"
                  tabIndex={0}
                  $isDragging={isDragging}
                  onClick={handleBrowseClick}
                  onKeyDown={handleDropzoneKeyDown}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
                  />
                  <DropzoneContent>
                    <FaFileUpload size={56} color={theme.colors.blue4} />
                    <DropzoneText>
                      <SubHeading3>
                        {t('learners_bulk_import.tabs.upload_csv.drag_title')}
                      </SubHeading3>
                    </DropzoneText>
                    <OrText>
                      <Body2Regular>{t('learners_bulk_import.tabs.upload_csv.or')}</Body2Regular>
                    </OrText>
                    <Button
                      id="bulk-import-browse-files"
                      text={t('buttons.browse_files')}
                      type="outline"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleBrowseClick();
                      }}
                    />
                    {selectedFile && (
                      <SelectedFile>
                        <Body2Regular>
                          {selectedFile.name}
                        </Body2Regular>
                      </SelectedFile>
                    )}
                    <DropzoneMeta>
                      <Body4>{t('learners_bulk_import.tabs.upload_csv.file_type')}</Body4>
                      <Body4>{t('learners_bulk_import.tabs.upload_csv.file_size')}</Body4>
                    </DropzoneMeta>
                  </DropzoneContent>
                </Dropzone>
              </UploadCard>
            )}

            {step === 1 && (
              <PlaceholderCard>
                <H2>{t('learners_bulk_import.tabs.verify_learners.tab_title')}</H2>
                <Body1>{t('learners_bulk_import.tabs.verify_learners.subtitle')}</Body1>
              </PlaceholderCard>
            )}

            {step === 2 && (
              <PlaceholderCard>
                <H2>{t('learners_bulk_import.tabs.final_review.tab_title')}</H2>
                <Body1>{t('learners_bulk_import.tabs.verify_learners.subtitle')}</Body1>
              </PlaceholderCard>
            )}
          </div>
        </ContentWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 48px 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentHeader = styled.div`
  padding-bottom: 12px;
`;

const UploadCard = styled.div`
  width: 1024px;
  max-width: 100%;
  background: ${props => props.theme.colors.light.white};
  border-radius: 24px;
  padding: 40px;
`;

const PlaceholderCard = styled(UploadCard)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Subtitle = styled.div`
  margin: 10px 0px;
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
  background: ${props => props.theme.colors.dark.lightGrey};
  margin: 32px 0;
`;

const SectionTitle = styled.div`
  margin-bottom: 16px;
  color: ${props => props.theme.colors.dark.black};
`;

const Dropzone = styled.div<{ $isDragging: boolean }>`
  border-radius: 20px;
  border: 2px dashed ${props => props.theme.colors.blue6};
  background: ${({ theme, $isDragging }) =>
    $isDragging ? theme.colors.blue6 : theme.colors.blue0};
  padding: 32px;
  text-align: center;
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
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const OrText = styled.div`
  color: ${props => props.theme.colors.dark.mediumGrey};
`;

const SelectedFile = styled.div`
  margin-top: 8px;
  color: ${props => props.theme.colors.dark.mediumGrey};
`;

const DropzoneMeta = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.dark.darkGrey};

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
`;

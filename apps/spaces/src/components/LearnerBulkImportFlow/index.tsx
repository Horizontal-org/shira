import { DragEvent, FunctionComponent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Breadcrumbs, styled, BetaBanner } from "@shira/ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LearnerBulkImportHeader } from "../LearnerBulkImportHeader";
import { ExitLearnerBulkImportModal } from "../modals/ExitLearnerBulkImportModal";
import { FormattingGuidelinesModal } from "../modals/FormattingGuidelinesModal";
import { Learner } from "../LearnerQuizView";
import { UploadCsvStep } from "./components/UploadCsvStep";
import { VerifyLearnersStep } from "./components/VerifyLearnersStep";
import { FinalReviewStep } from "./components/FinalReviewStep";
import { BulkInviteLearnersResponse, inviteLearnersBulk, verifyLearnersBulk } from "../../fetch/learner";

interface Props {
  onSubmit: (learners: Learner[]) => void;
}

export const LearnerBulkImportFlow: FunctionComponent<Props> = ({
  onSubmit,
}) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, handleStep] = useState(0);

  const [isExitBulkImportModalOpen, setIsExitBulkImportModalOpen] = useState(false);
  const [isFormattingGuidelinesOpen, setIsFormattingGuidelinesOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bulkInviteResponse, setBulkInviteResponse] = useState<BulkInviteLearnersResponse | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastVerifiedFileKey = useRef<string | null>(null);
  const lastInvitedFileKey = useRef<string | null>(null);

  const validateStep = () => {
    if (step === 0) {
      return !!selectedFile && !isFileLoading;
    }

    if (step === 2) {
      return !isSubmitting;
    }

    return true;
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setSelectedFile(file);
    setBulkInviteResponse(null);
    lastVerifiedFileKey.current = null;
    lastInvitedFileKey.current = null;
  };

  const clearSelectedFile = () => {
    setIsFileLoading(false);
    setIsSubmitting(false);
    setSelectedFile(null);
    setBulkInviteResponse(null);
    setIsDragging(false);
    lastVerifiedFileKey.current = null;
    lastInvitedFileKey.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
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

  useEffect(() => {
    if (step !== 1 || !selectedFile) {
      return;
    }

    const fileKey = `${selectedFile.name}-${selectedFile.size}-${selectedFile.lastModified}`;
    if (lastVerifiedFileKey.current === fileKey) {
      return;
    }

    setIsFileLoading(true);
    verifyLearnersBulk(selectedFile)
      .then((response) => {
        setBulkInviteResponse(response);
        lastVerifiedFileKey.current = fileKey;
      })
      .catch((error) => {
        console.error("Failed to verify learners in bulk:", error);
      })
      .finally(() => {
        setIsFileLoading(false);
      });
  }, [selectedFile, step]);

  useEffect(() => {
    if (step !== 2 || !selectedFile) {
      return;
    }

    const fileKey = `${selectedFile.name}-${selectedFile.size}-${selectedFile.lastModified}`;
    if (lastInvitedFileKey.current === fileKey) {
      return;
    }

    setIsSubmitting(true);
    inviteLearnersBulk(selectedFile)
      .then(() => {
        lastInvitedFileKey.current = fileKey;
      })
      .catch((error) => {
        console.error("Failed to invite learners in bulk:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [onSubmit, selectedFile, step]);

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
            if (isSubmitting) {
              return;
            }
            onSubmit([]);
            return;
          }
          handleStep(step + 1);
        }}
        onBack={() => {
          if (step === 0) {
            setIsExitBulkImportModalOpen(true);
            return;
          }
          clearSelectedFile();
          handleStep(0);
        }}
        step={step}
        disableNext={!validateStep()}
        onExit={() => {
          setIsExitBulkImportModalOpen(true);
        }}
      />

      <Container>
        <ContentWrapper>
          <div>
            <ContentHeader id="learner-bulk-import-header">
              <Breadcrumbs
                active={step}
                items={[
                  { text: t('learners_bulk_import.tabs.upload_csv.tab_title') },
                  { text: t('learners_bulk_import.tabs.verify_learners.tab_title') },
                  { text: t('learners_bulk_import.tabs.review.tab_title') }
                ]}
              />
            </ContentHeader>

            {step === 0 && (
              <UploadCsvStep
                selectedFile={selectedFile}
                isFileLoading={isFileLoading}
                isDragging={isDragging}
                fileInputRef={fileInputRef}
                onBrowseClick={handleBrowseClick}
                onDropzoneKeyDown={handleDropzoneKeyDown}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onFileChange={handleFileChange}
                onClearFile={clearSelectedFile}
                onOpenGuidelines={() => setIsFormattingGuidelinesOpen(true)}
              />
            )}

            {step === 1 && (
              <VerifyLearnersStep response={bulkInviteResponse} />
            )}

            {step === 2 && (
              <FinalReviewStep />
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

import { FunctionComponent, useState } from "react";
import { Breadcrumbs, styled, BetaBanner } from "@shira/ui";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LearnerBulkImportHeader } from "../LearnerBulkImportHeader";

interface Props {
}

export const LearnerBulkImportFlow: FunctionComponent<Props> = ({
}) => {

  const { t } = useTranslation();
  // const navigate = useNavigate();

  const [step, handleStep] = useState(0);

  // const [isExitQuestionModalOpen, setIsExitQuestionModalOpen] = useState(false)

  const validateStep = () => {
    return true
  }

  return (
    <>
      {/* <ExitQuestionHandleModal
        isModalOpen={isExitQuestionModalOpen}
        setIsModalOpen={setIsExitQuestionModalOpen}
        onConfirm={() => {
          navigate(-1)
        }}
      /> */}

      <BetaBanner url="/support" />

      <LearnerBulkImportHeader
        onNext={() => {
          if (step === 2) {
            return
          }
          if (step === 1) {
            return
          }
          handleStep(step + 1)
        }}
        onBack={() => {
          if (step === 0) {
            // setIsExitQuestionModalOpen(true)
          } else {
            handleStep(step - 1)
          }
        }}
        step={step}
        disableNext={!validateStep()}
        onExit={() => { /* setIsExitQuestionModalOpen(true) */ }}
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
              {step === 2 && (
                <div> Step 2 Title Explanation </div>
              )}
            </ContentHeader>

            {step === 0 && (
              <div> Step 0 </div>
            )}

            {step === 1 && (
              <div> Step 1 </div>
            )}

            {step === 2 && (
              <div> Step 2 </div>
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

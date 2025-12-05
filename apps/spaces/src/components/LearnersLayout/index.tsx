import { FunctionComponent, useState } from "react";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { BetaBanner, Body1, Button, defaultTheme, H2, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { LearnersTable } from "../LearnersTable";
import { InviteLearnerModal } from "../modals/InviteLearnerModal";
import { LearnerErrorModal } from "../modals/ErrorModal";
import { DeleteLearnerAction } from "../LearnersTable/components/DeleteLearnerAction";
import toast from "react-hot-toast";
import { handleHttpError } from "../../fetch/handleError";
import { inviteLearner } from "../../fetch/learner";
import { getErrorContent } from "../../utils/getErrorContent";
import { MdEmail } from "react-icons/md";
import { PiDownloadSimpleBold } from "react-icons/pi";

interface Props { }

export const LearnersLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate)
  const {
    space,
  } = useStore((state) => ({
    space: state.space,
  }), shallow)

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryAction, setRetryAction] = useState<(() => void) | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [id, setLearnerIdToDelete] = useState<number | null>(null);
  const [deleteSuccessCallback, setDeleteSuccessCallback] = useState<(() => void) | null>(null);

  const openErrorModal = (content: string, retry: () => void) => {
    setErrorMessage(content);
    setRetryAction(() => retry);
    setIsErrorModalOpen(true);
    setIsInvitationModalOpen(false);
  };

  const handleDeleteRequest = (learnerId: number, onDeleted: () => void) => {
    setLearnerIdToDelete(learnerId);
    setDeleteSuccessCallback(() => onDeleted);
    setIsDeleteModalOpen(true);
  };

  const handleLearnerDeleted = () => {
    deleteSuccessCallback?.();
    setLearnerIdToDelete(null);
    setDeleteSuccessCallback(null);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setLearnerIdToDelete(null);
    setDeleteSuccessCallback(null);
  };

  const handleErrorModalCancel = () => {
    setIsErrorModalOpen(false);
    setRetryAction(null);
    setErrorMessage(null);
  };

  const handleErrorModalRetry = () => {
    setIsErrorModalOpen(false);
    if (retryAction) {
      retryAction();
    }
  };

  const invite = async (name: string, email: string) => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 5000));
      await inviteLearner(name, email);
      toast.success(t(`success_messages.learner_invitation_sent`), { duration: 3000 });

      setIsInvitationModalOpen(false);
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "invite_learner_failed", e.message);

      if (e.message === "learner_already_exists") {
        throw error;
      }

      openErrorModal(content, () => invite(name, email));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutContainer>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
      />

      <LayoutMainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="/support" />
        <LayoutMainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3>{space && space.name}</StyledSubHeading3>
            <H2>{t('learners.title')}</H2>
            <Body1>{t('learners.subtitle')}</Body1>
          </HeaderContainer>
          <ActionContainer>
            <Button
              id="invite-learner-button"
              text={t("buttons.invite_learner")}
              type="primary"
              leftIcon={<MdEmail />}
              onClick={() => setIsInvitationModalOpen(true)}
              color={defaultTheme.colors.green7}
            />
            <Button
              id="invite-learners-bulk-button"
              text={t("buttons.invite_learners_bulk")}
              type="primary"
              leftIcon={<PiDownloadSimpleBold />}
              color={defaultTheme.colors.green7}
            />
            <InviteLearnerModal
              isModalOpen={isInvitationModalOpen}
              setIsModalOpen={setIsInvitationModalOpen}
              onConfirm={(name, email) => invite(name, email)}
              isLoading={loading}
            />
          </ActionContainer>
          <div>
            <LearnersTable
              openErrorModal={openErrorModal}
              onDeleteLearner={handleDeleteRequest}
            />
          </div>
          <DeleteLearnerAction
            learnerId={id}
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            openErrorModal={openErrorModal}
            onDeleted={handleLearnerDeleted}
            onCancel={handleDeleteModalCancel}
          />
          <LearnerErrorModal
            isOpen={isErrorModalOpen}
            errorMessage={errorMessage}
            onRetry={handleErrorModalRetry}
            onCancel={handleErrorModalCancel}
          />
        </LayoutMainContentWrapper>
      </LayoutMainContent>
    </LayoutContainer>
  )
}

const StyledSubHeading3 = styled(SubHeading3)`
  color: ${props => props.theme.colors.green7}; 
`;

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  padding-right: 20px;
  padding-bottom: 12px;
  padding-left: 20px;
`;

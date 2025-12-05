import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { BetaBanner, Body1, Button, defaultTheme, H2, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { LearnersTable, Learner } from "../LearnersTable";
import { InviteLearnerModal } from "../modals/InviteLearnerModal";
import { LearnerErrorModal } from "../modals/ErrorModal";
import { DeleteLearnerAction } from "../LearnersTable/components/DeleteLearnerAction";
import { BulkDeleteLearnersAction } from "../LearnersTable/components/BulkDeleteLearnersAction";
import toast from "react-hot-toast";
import { handleHttpError } from "../../fetch/handleError";
import { fetchLearners, inviteLearner } from "../../fetch/learner";
import { getErrorContent } from "../../utils/getErrorContent";
import { MdEmail, MdDelete } from "react-icons/md";
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

  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [id, setLearnerIdToDelete] = useState<number | null>(null);
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLearners, setSelectedLearners] = useState<Learner[]>([]);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  const selectedLearnerIds = useMemo(() => selectedLearners.map((learner) => learner.id), [selectedLearners]);
  const hasSelectedLearners = selectedLearnerIds.length > 0;

  const handleSelectionChange = useCallback((selection: Learner[]) => {
    setSelectedLearners(selection);
  }, []);


  const handleBulkDeleteCancel = useCallback(() => {
    setIsBulkDeleteModalOpen(false);
  }, []);

  const openErrorModal = (content: string, retry: () => void) => {
    setErrorMessage(content);
    setRetryAction(() => retry);
    setIsErrorModalOpen(true);
    setIsInvitationModalOpen(false);
  };

  const handleDelete = (learnerId: number) => {
    setLearnerIdToDelete(learnerId);
    setIsDeleteModalOpen(true);
  };

  const handleLearnerDeleted = () => {
    setLearnerIdToDelete(null);
    getLearners();
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
    setLearnerIdToDelete(null);
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

  const getLearners = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchLearners();
      setLearners(res);
    } catch (e) {
      console.log("🚀 ~ fetchLeaners ~ e:", e)
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBulkDeleteSuccess = useCallback(() => {
    setSelectedLearners([]);
    getLearners();
  }, [getLearners]);

  useEffect(() => {
    getLearners();
  }, [getLearners]);

  const handleResendInvitation = async (learner: Learner) => {
    try {
      await inviteLearner(learner.name, learner.email);
      toast.success(
        t("success_messages.learner_invitation_resent", { email: learner.email }), { duration: 3000 }
      );
      getLearners();
    } catch (error) {
      const e = handleHttpError(error);
      const content = getErrorContent("error_messages", "invite_learner_failed", e.message);

      openErrorModal(content, () => handleResendInvitation(learner));
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
              onInvite={getLearners}
              openErrorModal={openErrorModal}
            />
          </ActionContainer>
          <TableSection>
            {hasSelectedLearners && (
              <BulkActionContainer>
                <Button
                  id="delete-learners-bulk-button"
                  text={t("buttons.delete_learners")}
                  type="primary"
                  leftIcon={<MdDelete />}
                  color={defaultTheme.colors.error7}
                  onClick={() => setIsBulkDeleteModalOpen(true)}
                />
              </BulkActionContainer>
            )}
            <LearnersTable
              data={learners}
              loading={loading}
              onDeleteLearner={handleDelete}
              onResendInvitation={handleResendInvitation}
              onSelectionChange={handleSelectionChange}
            />
          </TableSection>
          <DeleteLearnerAction
            learnerId={id}
            isModalOpen={isDeleteModalOpen}
            setIsModalOpen={setIsDeleteModalOpen}
            openErrorModal={openErrorModal}
            onDeleted={handleLearnerDeleted}
            onCancel={handleDeleteModalCancel}
          />
          <BulkDeleteLearnersAction
            learnerIds={selectedLearnerIds}
            isModalOpen={isBulkDeleteModalOpen}
            setIsModalOpen={setIsBulkDeleteModalOpen}
            openErrorModal={openErrorModal}
            onDeleted={handleBulkDeleteSuccess}
            onCancel={handleBulkDeleteCancel}
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

const TableSection = styled.div`
  position: relative;
`;

const BulkActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px 12px;
`;

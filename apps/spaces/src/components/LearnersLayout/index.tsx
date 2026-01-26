import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { LayoutMainContent, LayoutMainContentWrapper } from "../LayoutStyleComponents/LayoutMainContent";
import { BetaBanner, Body1, Button, defaultTheme, H2, Sidebar, styled, SubHeading3, useAdminSidebar } from "@shira/ui";
import { LayoutContainer } from "../LayoutStyleComponents/LayoutContainer";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { LearnersTable, Learner } from "../LearnersTable";
import { InviteLearnerModal } from "../modals/InviteLearnerModal";
import { DeleteLearnerAction } from "../LearnersTable/components/DeleteLearnerAction";
import { BulkDeleteLearnersAction } from "../LearnersTable/components/BulkDeleteLearnersAction";
import toast from "react-hot-toast";
import { handleHttpError } from "../../fetch/handleError";
import { inviteLearner } from "../../fetch/learner";
import { getErrorContent } from "../../utils/getErrorContent";
import { MdEmail, MdDelete } from "react-icons/md";
import { useLearners } from "../../hooks/useLearners";
import { GenericErrorModal } from "../modals/ErrorModal";
import { FiDownload } from "react-icons/fi";
import { BulkInviteSentModal } from "../modals/BulkInviteSentModal";

interface Props { }

export const LearnersLayout: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, handleCollapse, menuItems } = useAdminSidebar(navigate);

  const { space } = useStore(
    (state) => ({ space: state.space }),
    shallow
  );

  const [isInviteLearnerModalOpen, setIsInviteLearnerModalOpen] = useState(false);
  const [isDeleteLearnerModalOpen, setIsDeleteLearnerModalOpen] = useState(false);
  const [isBulkDeleteLearnersModalOpen, setIsBulkDeleteLearnersModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isBulkInviteSentModalOpen, setIsBulkInviteSentModalOpen] = useState(false);
  const [bulkInviteCount, setBulkInviteCount] = useState(0);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [selectedLearnerIdToDelete, setSelectedLearnerIdToDelete] = useState<number | null>(null);

  const {
    learners,
    loading,
    fetchLearners,
    rowSelection,
    setRowSelection,
    selectedLearnerIds,
    clearSelectedLearners
  } = useLearners();

  const hasLearners = !!learners?.length;
  const hasSelectedLearners = selectedLearnerIds.length > 0;

  const openErrorModal = (content: string) => {
    setErrorMessage(content);
    setIsErrorModalOpen(true);
    setIsInviteLearnerModalOpen(false);
    clearSelectedLearners();
    setSelectedLearnerIdToDelete(null);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorMessage(null);
    clearSelectedLearners();
  };

  const handleResendInvitation = useCallback(
    async (learner: Learner) => {
      try {
        await inviteLearner(learner.name, learner.email);
        toast.success(
          t("success_messages.learner_invitation_resent", { email: learner.email })
        );
        await fetchLearners();
      } catch (e) {
        const error = handleHttpError(e);
        const content = getErrorContent("error_messages", "invite_learner_failed", error.message);

        openErrorModal(content);
        clearSelectedLearners();
      }
    },
    [t, fetchLearners, openErrorModal]
  );

  const handleDeleteModalCancel = () => {
    setIsDeleteLearnerModalOpen(false);
    setSelectedLearnerIdToDelete(null);
    clearSelectedLearners();
  };

  const handleOpenDeleteModal = (id: number) => {
    setSelectedLearnerIdToDelete(id);
    setIsDeleteLearnerModalOpen(true);
    clearSelectedLearners();
  };

  const handleLearnerDeleted = () => {
    setSelectedLearnerIdToDelete(null);
    fetchLearners();
  };

  const handleBulkDeleteSuccess = () => {
    fetchLearners();
  };

  useEffect(() => {
    fetchLearners();
  }, [fetchLearners]);

  useEffect(() => {
    const state = location.state as { bulkInviteSent?: { count: number } } | null;
    if (!state?.bulkInviteSent) {
      return;
    }

    setBulkInviteCount(state.bulkInviteSent.count);
    setIsBulkInviteSentModalOpen(true);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.state, location.pathname, navigate]);

  return (
    <LayoutContainer>
      <Sidebar
        menuItems={menuItems}
        onCollapse={handleCollapse}
        selectedItemLabel={menuItems.find(m => m.path === '/learner').label}
      />

      <LayoutMainContent $isCollapsed={isCollapsed}>
        <BetaBanner url="https://shira.app/beta-user" />

        <LayoutMainContentWrapper>
          <HeaderContainer>
            <StyledSubHeading3>{space && space.name}</StyledSubHeading3>
            <H2>{t("learners.title")}</H2>
            <Body1>{t("learners.subtitle")}</Body1>
          </HeaderContainer>

          <ActionContainer>
            <LeftActions>
              {hasLearners && !hasSelectedLearners && (
                <>
                  <Button
                    id="invite-learner-button"
                    text={t("buttons.invite_learner")}
                    type="primary"
                    leftIcon={<MdEmail />}
                    onClick={() => setIsInviteLearnerModalOpen(true)}
                    color={defaultTheme.colors.green7} />
                  <Button
                    id="invite-learners-bulk-button"
                    text={t("buttons.invite_learners_bulk")}
                    type="primary"
                    leftIcon={<FiDownload />}
                    onClick={() => navigate('/learner/import/bulk')}
                    color={defaultTheme.colors.green7} />
                </>
              )}
            </LeftActions>

            <RightActions>
              {hasSelectedLearners && (
                <BulkActionContainer>
                  <Button
                    id="delete-learners-bulk-button"
                    text={t("buttons.delete_learners")}
                    type="primary"
                    leftIcon={<MdDelete />}
                    color={defaultTheme.colors.error7}
                    onClick={() => {
                      setIsBulkDeleteLearnersModalOpen(true)
                    }}
                  />
                </BulkActionContainer>
              )}
            </RightActions>
          </ActionContainer>

          <TableSection>
            <LearnersTable
              data={learners}
              loading={loading}
              onDeleteLearner={handleOpenDeleteModal}
              onResendInvitation={handleResendInvitation}
              onInviteLearner={() => setIsInviteLearnerModalOpen(true)}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          </TableSection>

          <InviteLearnerModal
            isModalOpen={isInviteLearnerModalOpen}
            setIsModalOpen={setIsInviteLearnerModalOpen}
            onInviteSuccess={fetchLearners}
            openErrorModal={openErrorModal}
          />

          <DeleteLearnerAction
            learnerId={selectedLearnerIdToDelete}
            isModalOpen={isDeleteLearnerModalOpen}
            setIsModalOpen={setIsDeleteLearnerModalOpen}
            openErrorModal={openErrorModal}
            onDeleted={handleLearnerDeleted}
            onCancel={handleDeleteModalCancel}
          />

          <BulkDeleteLearnersAction
            learnerIds={selectedLearnerIds}
            isModalOpen={isBulkDeleteLearnersModalOpen}
            setIsModalOpen={setIsBulkDeleteLearnersModalOpen}
            openErrorModal={openErrorModal}
            onDeleted={handleBulkDeleteSuccess}
            onCancel={() => {
              setIsBulkDeleteLearnersModalOpen(false);
              clearSelectedLearners();
            }}
          />

          <BulkInviteSentModal
            isModalOpen={isBulkInviteSentModalOpen}
            inviteCount={bulkInviteCount}
            onClose={() => setIsBulkInviteSentModalOpen(false)}
          />

          <GenericErrorModal
            isOpen={isErrorModalOpen}
            errorMessage={errorMessage}
            onRetry={() => { closeErrorModal(); }}
            onCancel={closeErrorModal}
          />
        </LayoutMainContentWrapper>
      </LayoutMainContent>
    </LayoutContainer>
  );
};

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
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

const LeftActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TableSection = styled.div`
  position: relative;
`;

const BulkActionContainer = styled.div`
  display: flex;
`;

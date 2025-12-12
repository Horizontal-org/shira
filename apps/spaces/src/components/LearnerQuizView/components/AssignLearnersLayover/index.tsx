import { Body1, FlowHeader, H2, styled } from "@shira/ui";
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { AssignLearnersTable } from "../AssignLearnersTable";
import { AssignRequest, getUnassignedLearners } from "../../../../fetch/learner_quiz";
import { AssignLearnerAction } from "../AssignLearnerAction";

interface Props {
  quizId: number;
  title: string;
  onExit: () => void;
  openErrorModal: (content: string, retry: () => void) => void;
  onSuccess: () => void;
}

export const AssignLearnersLayover: FunctionComponent<Props> = ({
  quizId,
  title,
  onExit,
  openErrorModal,
  onSuccess
}) => {

  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [assigning, setAssigning] = useState(false);

  const fetchLearnerQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUnassignedLearners(quizId);
      setData(response);
    } catch (e) {
      console.log("🚀 ~ fetchLeaners ~ e:", e);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  const selectedLearners = useMemo<AssignRequest[]>(
    () =>
      Object.entries(rowSelection)
        .filter(([, isSelected]) => Boolean(isSelected))
        .map(([id]) => ({
          learnerId: Number(id),
          quizId,
        })),
    [rowSelection, quizId]
  );

  useEffect(() => {
    fetchLearnerQuiz();
  }, [fetchLearnerQuiz]);

  return (
    <Wrapper>
      <FlowHeader
        onExit={onExit}
        title={title}
        actions={(
          <AssignLearnerAction
            learners={selectedLearners}
            openErrorModal={openErrorModal}
            loading={loading}
            disabled={rowSelection && Object.keys(rowSelection).length === 0}
            onAssigningChange={setAssigning}
            onSuccess={() => {
              setRowSelection({});
              fetchLearnerQuiz();
              onSuccess();
            }}
          />
        )}
      />
      <Content>
        <div>
          <Header>
            <H2 id="registered-learners-title">{t('learners.assign_dialog.registered_title')}</H2>
            <Body1 id="registered-learners-subtitle">
              <Trans
                i18nKey="learners.assign_dialog.registered_description"
                components={[<StyledLink to="/learner" />]}
              />
            </Body1>
          </Header>

          <AssignLearnersTable
            data={data}
            loading={loading}
            assigning={assigning}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: ${props => props.theme.colors.light.paleGrey};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 48px 0;
  max-width: 1024px;
  > p {
    padding-top: 12px; 
  }
`;

const Content = styled.div`
  width: 100%;  
  box-sizing: border-box;
  overflow-y:scroll;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  color: ${props => props.theme.primary.base};
  text-decoration-color: ${props => props.theme.primary.base};

`;
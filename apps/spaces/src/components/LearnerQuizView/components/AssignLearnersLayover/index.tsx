import { Body1, Button, FlowHeader, H2, styled, useTheme } from "@shira/ui";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { getFreeLearners } from "../../../../fetch/learner_quiz";
import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { AssignLearnersTable } from "../AssignLearnersTable";

interface Props {
  quizId: number
  title: string
  onExit: () => void
}

export const AssignLearnersLayover:FunctionComponent<Props> = ({ quizId, title, onExit }) => {
  
  const { t } = useTranslation()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    const fetchLearnerQuiz = async () => {
      try {
        const data = await getFreeLearners(quizId)
        setData(data)
      }  catch (e) {
        console.log("🚀 ~ fetchLeaners ~ e:", e)
      } finally {
        setLoading(false)
      }      
    }

    fetchLearnerQuiz()
  }, [quizId])
    
  return (
    <Wrapper>
      <FlowHeader 
        onExit={onExit}
        title={title}
        actions={(
          <Button 
            type="primary"
            text={t('learners.assign_dialog.assign_button')}
            color={theme.colors.green7}
            leftIcon={(
              <IoPersonAdd
                size={20}
                color="white" 
              />
            )}
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
`

const Header = styled.div`
  padding: 48px 0;
  max-width: 1024px;
  > p {
    padding-top: 12px; 
  }
`

const Content = styled.div`
  width: 100%;  
  box-sizing: border-box;
  overflow-y:scroll;
  display: flex;
  justify-content: center;
`

const StyledLink = styled(Link)`
  font-weight: 700;
  color: ${props => props.theme.primary.base};
  text-decoration-color: ${props => props.theme.primary.base};

`
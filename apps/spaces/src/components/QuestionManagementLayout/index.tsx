import { FunctionComponent, useEffect, useState } from "react";
import {
  Breadcrumbs,
  styled,
  SubHeading2,
} from "@shira/ui";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuestionBasicInfo } from "../QuestionBasicInfo";
import { QuestionFlowHeader } from "../QuestionFlowHeader";
import { QuestionContent } from "../QuestionContent";
import { QuestionToBe } from "./types";

interface Props {}


export const QuestionManagementLayout: FunctionComponent<Props> = () => {

  const {
    apps,
    fetchApp,
  } = useStore((state) => ({
    apps: state.apps,
    fetchApp: state.fetchApp,
  }), shallow)

  useEffect(() => {
    fetchApp()
  }, [])

  const [step, handleStep] = useState(0)
  const [question, handleQuestion] = useState<QuestionToBe>({
    name: '',
    isPhishing: false,
  })

  const validateStep = () => {
    if (step === 0) {
      return question.name.length > 0 && !!(question.app)
    }

    return false
  }

  return (
    <>
      <QuestionFlowHeader 
        handleStep={handleStep}
        step={step}
        disableNext={!validateStep()}
      />
      <Container>      
        <ContentWrapper>
          <div>
            <ContentHeader>
              <SubHeading2>Question name</SubHeading2>
              <Breadcrumbs 
                active={step}
                items={[
                  { text: 'Question info' },
                  { text: 'Content' },
                  { text: 'Review' }
                ]}
              />
            </ContentHeader>

            { step === 0 && (
              <QuestionBasicInfo
                handleQuestion={(k, v) => {  
                  handleQuestion({
                    ...question,
                    [k]: v
                  })
                }}
                apps={apps}
                question={question}
              />
            )}

            { step === 1 && (
              <QuestionContent 
                handleQuestion={handleQuestion}
                question={question}
              />
            )}
          </div>
        </ContentWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 48px 0;
`

const ContentWrapper = styled.div`
    flex: 1;          
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentHeader = styled.div`
  padding-bottom: 12px;
`

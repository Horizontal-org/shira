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
import { EmailContent, QuestionToBe } from "./types";
import { QuestionReview } from "../QuestionReview";
import { useNavigate } from "react-router-dom";

interface Props {}

export const QuestionManagementLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate()

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
  const [content, handleContent] = useState({})
  console.log("🚀 ~ content:", content)
  
  const validateStep = () => {
    if (step === 0) {
      return question.name.length > 0 && !!(question.app)
    }

    return true
  }

  // (content) => {
  //   handleQuestion({
  //     ...question,
  //     content: parseContent(content)
  //   })
  // }

  const parseContent = (id, value) => {
    handleContent({
      ...content,
      [id]: value
  })
  }

  return (
    <>
      <QuestionFlowHeader 
        onNext={() => {
          if (step === 2) {
            // submit
            return
          }

          handleStep(step + 1)         
        }}
        onBack={() => {
          if (step === 0) {
            navigate(-1)
          } else {
            handleStep(step - 1)
          }
        }}
        step={step}
        disableNext={!validateStep()}
      />
      <Container>      
        <ContentWrapper>
          <div>
            <ContentHeader>
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
                handleContent={parseContent}
                question={question}
              />
            )}

            { step === 2 && (
              <QuestionReview 
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

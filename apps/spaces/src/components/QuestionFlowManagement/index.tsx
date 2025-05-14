import { FunctionComponent, useEffect, useState } from "react";
import {
  Breadcrumbs,
  styled,
} from "@shira/ui";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store";
import { QuestionBasicInfo } from "../QuestionBasicInfo";
import { QuestionFlowHeader } from "../QuestionFlowHeader";
import { QuestionContent } from "../QuestionContent";
import { QuestionToBe } from "./types";
import { QuestionReview } from "../QuestionReview";
import { useNavigate } from "react-router-dom";

interface Props {
  initialContent?: Object
  initialQuestion?: QuestionToBe
  actionFeedback: string
  onSubmit: (question: QuestionToBe) => void
}

const defaultQuestion = {
  app: null,
  name: '',
  isPhishing: true,
  emailContent: {
    senderEmail: '',
    senderName: '',
    subject: '',
    body: ''
  },
  attachments: []
}

export const QuestionFlowManagement: FunctionComponent<Props> = ({
  initialContent = {},
  initialQuestion = defaultQuestion,
  onSubmit,
  actionFeedback
}) => {

  const navigate = useNavigate()

  const {
    apps,
    fetchApp,
    clearExplanations
  } = useStore((state) => ({
    apps: state.apps,
    fetchApp: state.fetchApp,
    clearExplanations: state.clearExplanations
  }), shallow)

  useEffect(() => {
    fetchApp()

    return () => {
      clearExplanations()
    }
  }, [])

  const [step, handleStep] = useState(0)  
  const [question, handleQuestion] = useState<QuestionToBe>(initialQuestion)
  const [content, handleContent] = useState(initialContent)

  const validateStep = () => {
    if (step === 0) {
      return question.name.length > 0 && !!(question.app)
    }

    return true
  }

  const parseContent = (id, value) => {
    handleContent({
      ...content,
      [id]: value
    })
  }

  return (
    <>
      <QuestionFlowHeader 
        actionFeedback={actionFeedback}
        onNext={() => {
          if (step === 2) {
            // submit
            onSubmit(question)
            return
          }
          if (step === 1) {
            handleQuestion({
              ...question,
              content: content
            })
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
                  { text: 'Preview' }
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
                handleQuestion={(k, v) => {
                  handleQuestion({
                    ...question,
                    [k]: v
                  })
                }}
                content={content}
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

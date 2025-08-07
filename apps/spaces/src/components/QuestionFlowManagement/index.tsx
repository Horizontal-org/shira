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
import { ExitQuestionHandleModal } from "../modals/ExitQuestionHandleModal";
import { NoExplanationsModal } from "../modals/NoExplanationsModal";
import { omit } from "lodash";

interface Props {
  initialContent?: Object
  initialQuestion?: QuestionToBe
  initialAppType?: string
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
  messagingContent: {
    senderPhone: '',
    senderName: '',    
    draggableItems: []
  },
  attachments: []
}

export const QuestionFlowManagement: FunctionComponent<Props> = ({
  initialContent = {},
  initialQuestion = defaultQuestion,
  initialAppType = null,
  onSubmit,
  actionFeedback
}) => {

  const navigate = useNavigate()

  const {
    apps,
    fetchApp,
    clearExplanations,
    explanations
  } = useStore((state) => ({
    apps: state.apps,
    fetchApp: state.fetchApp,
    clearExplanations: state.clearExplanations,
    explanations: state.explanations
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
  
  console.log("888888888888888888 🚀 ~ question:", question)
  console.log("888888888888888888 🚀 ~ content:", content)

  const [isExitQuestionModalOpen, setIsExitQuestionModalOpen] = useState(false)
  const [noExplanationsModalOpen, setNoExplanationsModalOpen] = useState(false)

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

  const removeContent = (id) => {
    const newContent = omit(content, id)
    handleContent(newContent)
  }

  return (
    <>
      <ExitQuestionHandleModal
        isModalOpen={isExitQuestionModalOpen}
        setIsModalOpen={setIsExitQuestionModalOpen}
        onConfirm={() => {
          navigate(-1)
        }}
      />

      <NoExplanationsModal 
        isModalOpen={noExplanationsModalOpen}
        setIsModalOpen={setNoExplanationsModalOpen}
        onConfirm={() => {
          handleStep(step + 1)
        }}
      />
    
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

            if (explanations.length === 0) {
              setNoExplanationsModalOpen(true)
              return
            }
          }

          handleStep(step + 1)         
        }}
        onBack={() => {
          if (step === 0) {
            setIsExitQuestionModalOpen(true)
          } else {
            handleStep(step - 1)
          }
        }}
        step={step}
        disableNext={!validateStep()}
        onExit={() => { setIsExitQuestionModalOpen(true) }}
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
                initialAppType={initialAppType}
                apps={apps}
                question={question}
              />
            )}

            { step === 1 && (
              <QuestionContent 
                handleContentRemove={removeContent}
                handleContent={parseContent}
                handleContentFullChange={handleContent}
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

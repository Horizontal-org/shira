import { FunctionComponent, useState } from "react";
import { Body1, styled } from "@shira/ui";
import { HookIcon } from "./assets/hook";
import { ThumbIcon } from "./assets/thumb";
import { ExplanationsHelpModal } from "../../../modals/ExplanationsHelpModal";

interface Props {
  isPhishing: boolean
}

export const CommonHeader: FunctionComponent<Props> = ({
  isPhishing
}) => {

  const [modalOpen, setModalOpen] = useState(false)
  
  return (
    <>    
      <ExplanationsHelpModal
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}        
      />

      <IsPhishingWrapper>
        { isPhishing ? (
          <Content>
            <HookIcon />
            <Body1>You are writing a phishing message</Body1>
          </Content>
        ) : (
          <Content>
            <ThumbIcon />
            <Body1>You are writing a legitimate message</Body1>
          </Content>
        )}
      </IsPhishingWrapper>
      <ExplanationsTip>
          <span>
            {`On this screen, create the content that will be displayed in the question and the `}
          </span>
          <strong onClick={() => {
            setModalOpen(true)
          }}>
          {`explanations`}
          </strong> 
          {` to go with it.`}
      </ExplanationsTip>
    </>
  )
}

const IsPhishingWrapper = styled.div`
  width: fit-content;
  margin: 12px 0;
  padding: 16px 20px;
  background: #F3F3F3;
  border-radius: 20px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ExplanationsTip = styled.div`
  padding: 12px 0;

  > strong {
    color: #099CDB;
    text-decoration: underline;
    cursor: pointer; 
  }
`
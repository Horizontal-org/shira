import { FunctionComponent, useState } from "react";
import { Body1, styled } from "@shira/ui";
import { HookIcon } from "./assets/hook";
import { ThumbIcon } from "./assets/thumb";
import { ExplanationsHelpModal } from "../../../modals/ExplanationsHelpModal";
import { VariablesHelpModal } from "../../../modals/VariablesHelpModal";

interface Props {
  isPhishing: boolean
}

export const CommonHeader: FunctionComponent<Props> = ({
  isPhishing
}) => {

  const [explanationsModalOpen, setExplanationsModalOpen] = useState(false);
  const [variablesModalOpen, setVariablesModalOpen] = useState(false);

  return (
    <>
      <ExplanationsHelpModal
        isModalOpen={explanationsModalOpen}
        setIsModalOpen={setExplanationsModalOpen}
      />

      <VariablesHelpModal
        isModalOpen={variablesModalOpen}
        setIsModalOpen={setVariablesModalOpen}
      />

      <IsPhishingWrapper>
        {isPhishing ? (
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
          {`On this screen, create the content that will be displayed in the question, including the `}
        </span>
        <strong onClick={() => {
          setVariablesModalOpen(true)
        }}>
          {`variables`}
        </strong>
        {` and `}
        <strong onClick={() => {
          setExplanationsModalOpen(true)
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
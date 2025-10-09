import { FunctionComponent } from "react";
import { Body1, ExplanationIcon, Modal, styled } from "@shira/ui";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void
}

export const ExplanationsHelpModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {

  return (
    <Modal
      isOpen={isModalOpen}
      titleIcon={<SvgWrapper><ExplanationIcon /></SvgWrapper>}
      title={`Explanations`}
      primaryButtonText="OK"
      primaryButtonDisabled={false}
      secondaryButtonText="Cancel"
      onPrimaryClick={() => {
        setIsModalOpen(false);        
      }}      
    >
      <div>        
        <Body1>
          Explanations are short notes that highlight specific elements of a question and explain why these elements may indicate that a message is a phishing attempt or not.
        </Body1>
        <MiddleBody1>
          To add an explanation, select the explanation icon on the right side of each row. Explanations can be attached to: 
        </MiddleBody1>
        <List>
          <li><Body1>{`Fields, such as the sender’s name or email address`}</Body1></li>
          <li><Body1>{`Specific parts of the message content`}</Body1></li>
          <li><Body1>{`File attachments.`}</Body1></li>
        </List>
      </div>
    </Modal>
  )
}

const MiddleBody1 = styled(Body1)`
  padding-top: 16px;
`

const List = styled.ul`
  margin: 8px 0;

  > li {
    
    &::marker {
      color: black;
      font-size: 0.6em;
    } 
  }
`

const SvgWrapper = styled.div`
  width: 28px;
  height: 28px;

  > svg {
    width: 100%;
    height: 100%; 
  }
`
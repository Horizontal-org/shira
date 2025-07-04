import { FunctionComponent } from "react";
import { Body1, Modal, styled,  } from "@shira/ui";

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
          Explanations are sections of text that point to specific elements of a question to help them understand why a message seems like phishing or seems legitimate. 
        </Body1>
        <MiddleBody1>
          To add an explanation, select the explanation icon on the right side of each row. Explanations can be attached to:  
        </MiddleBody1>
        <List>
          <li><Body1>{`Fields (such as the sender email address or phone number)`}</Body1></li>
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
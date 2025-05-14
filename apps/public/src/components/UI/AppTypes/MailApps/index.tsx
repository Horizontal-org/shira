import { FunctionComponent } from 'react'
import { Explanation } from '../../../../domain/explanation';
import useParseHTML from '../../../../hooks/useParseHTML';
import { useStore } from '../../../../store';
import { Gmail } from '@shira/ui';

interface Props {
  content: string;
  name: string;
  explanations?: Explanation[]
  explanationNumber: number
  showExplanations: boolean
}

export const MailApps: FunctionComponent<Props> = ({ content, name, explanations, explanationNumber, showExplanations }) => {

  const {
    parseAttachments,
    parseCustomElement,
    parseContent, 
  } = useParseHTML(content)

  const { persistedEmail, persistedName } = useStore(
    (state) => ({
      persistedName: state.setup.name,
      persistedEmail: state.setup.email,
    })
  )
  
  return (
    <>
      { name === 'Gmail' && (
        <Gmail 
          senderName={parseCustomElement('component-required-sender-name')}
          senderEmail={parseCustomElement('component-required-sender-email')}
          receiverEmail={persistedEmail}
          receiverName={persistedName}
          subject={parseCustomElement('component-optional-subject')}
          content={parseContent()}
          attachments={parseAttachments()}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}
    </>    
  )
}
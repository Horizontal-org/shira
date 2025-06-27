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
  images?: Array<{ imageId: number; url: string }>
}

export const MailApps: FunctionComponent<Props> = ({ content, name, explanations, explanationNumber, showExplanations, images }) => {

  const {
    parseAttachments,
    parseCustomElement,
    parseContent, 
  } = useParseHTML(content, images)

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
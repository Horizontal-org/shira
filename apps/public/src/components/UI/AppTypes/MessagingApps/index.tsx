import { FunctionComponent } from 'react'
import { Explanation } from '../../../../domain/explanation';
import useParseHTML from '../../../../hooks/useParseHTML';
import { DatingApp, FBMessenger, SMS, Whatsapp } from '@shira/ui';


interface Props {
  content: string;
  name: string;
  explanations?: Explanation[];
  explanationNumber: number;
  showExplanations: boolean
}

export const MessagingApps: FunctionComponent<Props> = ({ content, name, explanations, explanationNumber, showExplanations }) => {

  const html = new DOMParser().parseFromString(content, 'text/html')

  const { parseCustomElement } = useParseHTML(content)

  return (
    <>
      { name === 'SMS' && (
        <SMS
          phone={parseCustomElement('component-required-phone')}
          content={html.getElementById('dynamic-content')}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      { name === 'Dating App' && (
        <DatingApp
          senderName={parseCustomElement('component-required-fullname')}
          content={html.getElementById('dynamic-content')}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      { name === 'Whatsapp' && (
        <Whatsapp
          phone={parseCustomElement('component-required-phone')}
          content={html.getElementById('dynamic-content')}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      { name === 'Messenger' && (
        <FBMessenger
          senderName={parseCustomElement('component-required-fullname')}
          content={html.getElementById('dynamic-content')}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}
    </>    
  )
}
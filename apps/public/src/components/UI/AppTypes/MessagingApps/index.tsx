import { FunctionComponent } from 'react'
import { Explanation } from '../../../../domain/explanation';

import { DatingApp, FBMessenger, SMS, WhatsApp, parseHtml } from '@horizontal-org/shira-ui';


interface Props {
  content: string;
  name: string;
  explanations?: Explanation[];
  explanationNumber: number;
  showExplanations: boolean
  images?: Array<{ imageId: number; url: string }>
}

export const MessagingApps: FunctionComponent<Props> = ({ content, name, explanations, explanationNumber, showExplanations, images }) => {

  const {
    parseCustomElement,
    parseDynamicContent
  } = parseHtml(content, images)

  return (
    <>
      {name === 'SMS' && (
        <SMS
          phone={parseCustomElement('component-required-phone')}
          content={parseDynamicContent()}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      {name === 'Dating App' && (
        <DatingApp
          senderName={parseCustomElement('component-required-fullname')}
          content={parseDynamicContent()}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      {name === 'WhatsApp' && (
        <WhatsApp
          phone={parseCustomElement('component-required-phone')}
          content={parseDynamicContent()}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      {name === 'Messenger' && (
        <FBMessenger
          senderName={parseCustomElement('component-required-fullname')}
          content={parseDynamicContent()}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}
    </>
  )
}
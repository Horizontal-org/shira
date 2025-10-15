import { FunctionComponent } from 'react';
import { Gmail, Outlook } from '@shira/ui';
import { UIExplanation } from '../..';
import parseHtml from '../../../../utils/parseHtml';

interface Props {
  content: string;
  name: string;
  explanations?: UIExplanation[];
  explanationNumber: number
  showExplanations: boolean
  images?: Array<{ imageId: number; url: string }>
}

export const MailApps: FunctionComponent<Props> = ({ content, name, explanations, explanationNumber, showExplanations, images }) => {

  const { parseAttachments, parseCustomElement, parseContent } = parseHtml(content, images);


  return (
    <>
      {name === 'Gmail' && (
        <Gmail
          senderName={parseCustomElement('component-required-sender-name')}
          senderEmail={parseCustomElement('component-required-sender-email')}
          subject={parseCustomElement('component-optional-subject')}
          content={parseContent()}
          attachments={parseAttachments()}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}
      {name === 'Outlook' && (
        <Outlook
          senderName={parseCustomElement('component-required-sender-name')}
          senderEmail={parseCustomElement('component-required-sender-email')}
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
import { FunctionComponent, useEffect } from 'react'
import useParseHTML from '../../../../utils/parseHtml';
import { DatingApp, FBMessenger, SMS, Whatsapp } from '@horizontal-org/shira-ui';
import { UIExplanation } from '../..';

interface Props {
  content: string;
  name: string;
  explanations?: UIExplanation[];
  explanationNumber: number;
  showExplanations: boolean
}

export const MessagingApps: FunctionComponent<Props> = ({ content, name, explanations, explanationNumber, showExplanations }) => {

  const html = new DOMParser().parseFromString(content, 'text/html')

  const { parseCustomElement } = useParseHTML(content)

  const contentRoot = getMessagingContentRoot(html)
  const phone = parseCustomElement('component-required-phone')
  const senderName = getSenderName(parseCustomElement)

  return (
    <>
      {name === 'SMS' && (
        <SMS
          phone={phone}
          content={contentRoot}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      {name === 'Dating App' && (
        <DatingApp
          senderName={senderName}
          content={contentRoot}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      {name === 'Whatsapp' && (
        <Whatsapp
          phone={phone}
          content={contentRoot}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}

      {name === 'Messenger' && (
        <FBMessenger
          senderName={senderName}
          content={contentRoot}
          explanations={explanations}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
        />
      )}
    </>
  )
}

const getMessagingContentRoot = (html: Document) => {
  const dynamicContent = html.getElementById('dynamic-content')

  if (dynamicContent) {
    return dynamicContent
  }

  const fallbackRoot = html.createElement('div')
  const messageNodes = html.querySelectorAll(
    '[id*="component-text"], [id*="component-attachment"], [id*="component-image"]',
  )

  messageNodes.forEach((node) => {
    fallbackRoot.appendChild(node.cloneNode(true))
  })

  return fallbackRoot
}

const getSenderName = (
  parseCustomElement: (customElement: string) => {
    textContent: string;
    explanationPosition: string | null;
  },
) => {
  const senderName = parseCustomElement('component-required-fullname')

  if (senderName.textContent.trim()) {
    return senderName
  }

  return parseCustomElement('component-required-phone')
}

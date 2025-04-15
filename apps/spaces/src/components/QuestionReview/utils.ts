import { DatingApp, FBMessenger, Gmail, SMS, Whatsapp } from "@shira/ui"


const parseAttachments = (html: Document) => {
  const htmlAttachments = html.querySelectorAll('[id*="component-attachment"]')
  const attachments = Array.from(htmlAttachments).map((a) => {
    return {
      name: a.textContent,
      position: a.getAttribute('data-position'),
      explanationPosition: a.getAttribute('data-explanation')
    }
  })

  return attachments
}

const parseCustomElement = (html: Document, customElement: string) => {
  const element = html.getElementById(customElement)

  const object = {
    textContent: element?.textContent || '',
    explanationPosition: element?.getAttribute('data-explanation') || null
  }

  return object
}

const parseContent = (html: Document): HTMLElement => {
  const contentElement = html.querySelector('[id*="component-text"]') as HTMLElement
  return contentElement || document.createElement('div')
}

const parseDynamicContent = (html: Document) => html.getElementById('dynamic-content')


export const AppComponents = {
  'Gmail': (Gmail),
  'SMS': SMS,
  'Dating App': DatingApp,
  'Whatsapp': Whatsapp,
  'FBMessenger': FBMessenger
}

export const getContentProps = (appName, content) => {
  
  const remapHtml = Object.keys(content).map((o) => {
    return content[o]  
  }).join()
  const html = new DOMParser().parseFromString(`<div>${remapHtml}</div>`, 'text/html')
  
  if (appName === 'Gmail') {

    // { name === 'Gmail' && (
    //   <Gmail 
    //     senderName={parseCustomElement('component-required-sender-name')}
    //     senderEmail={parseCustomElement('component-required-sender-email')}
    //     subject={parseCustomElement('component-optional-subject')}
    //     content={parseContent()}
    //     attachments={parseAttachments()}
    //     explanations={explanations}
    //     explanationNumber={explanationNumber}
    //     showExplanations={showExplanations}
    //   />
    // )}

    return {
      senderName: parseCustomElement(html, 'component-required-sender-name'),
      senderEmail: parseCustomElement(html, 'component-required-sender-email'),
      subject: parseCustomElement(html, 'component-optional-subject'),
      content: parseContent(html),
      // content: new DOMParser().parseFromString(content['component-text-1'], 'text/html').querySelector('[id*="component-text"]'),
      attachments: parseAttachments(html)
    }
  } 
  return {}
}
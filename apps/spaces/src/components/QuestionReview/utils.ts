import { DatingApp, FBMessenger, Gmail, SMS, Whatsapp } from "@shira/ui"
import { remapHtml } from "../../utils/remapHtml"


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


export const AppComponents = {
  'Gmail': (Gmail),
  'SMS': SMS,
  'Dating App': DatingApp,
  'Whatsapp': Whatsapp,
  'FBMessenger': FBMessenger
}

export const getContentProps = (appName, content) => {
  
  const html = remapHtml(content)
  
  if (appName === 'Gmail') {

    return {
      senderName: parseCustomElement(html, 'component-required-sender-name'),
      senderEmail: parseCustomElement(html, 'component-required-sender-email'),
      subject: parseCustomElement(html, 'component-optional-subject'),
      content: parseContent(html),
      attachments: parseAttachments(html)
    }
  } 
  return {}
}
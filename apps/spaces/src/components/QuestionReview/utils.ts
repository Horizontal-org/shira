import { DatingApp, FBMessenger, Gmail, SMS, Whatsapp } from "@shira/ui"
import { remapHtml } from "../../utils/remapHtml"


const parseAttachments = (html: Document) => {
  const htmlAttachments = html.querySelectorAll('[id*="component-attachment"]')
  const attachments = Array.from(htmlAttachments).map((a) => {
    return {
      name: a.textContent,
      position: a.getAttribute('data-position'),
      explanationPosition: a.getAttribute('data-explanation'),
      fileType: a.getAttribute('data-attachment-type')
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
  contentElement.querySelectorAll('a').forEach((element) => {
      element.setAttribute('onclick', 'return false;');
      element.setAttribute('oncontextmenu', 'return false;');
  })
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
  } else {
    const draggableContent = Object.keys(content)
      .filter(ck => ck.includes('component-text') || ck.includes('component-image'))
      .map(dk => content[dk])
    const draggableContentHtml = remapHtml(draggableContent)

    let props = {
      content: draggableContentHtml || document.createElement('div'),
      senderName: parseCustomElement(html, 'component-required-sender-name'),
    }
    
    if (appName === 'Whatsapp' || appName === 'SMS') {
      props['phone'] = parseCustomElement(html, 'component-required-sender-phone')
    }
    return props
  }  
}
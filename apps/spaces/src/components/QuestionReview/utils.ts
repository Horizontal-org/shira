import { DatingApp, FBMessenger, Gmail, SMS, Whatsapp } from "@shira/ui"
import { remapHtml } from "../../utils/remapHtml"
import { ActiveQuestion, QuestionEditorInput } from "../../store/types/active_question"


// const parseAttachments = (html: Document) => {
//   const htmlAttachments = html.querySelectorAll('[id*="component-attachment"]')
//   const attachments = Array.from(htmlAttachments).map((a) => {
//     return {
//       name: a.textContent,
//       position: a.getAttribute('data-position'),
//       explanationPosition: a.getAttribute('data-explanation'),
//       fileType: a.getAttribute('data-attachment-type')
//     }
//   })

//   return attachments
// }

// const parseCustomElement = (html: Document, customElement: string) => {
//   const element = html.getElementById(customElement)

//   const object = {
//     textContent: element?.textContent || '',
//     explanationPosition: element?.getAttribute('data-explanation') || null
//   }

//   return object
// }

const parseEditorContent = (activeQuestionItem: QuestionEditorInput): HTMLElement => {
  const editorElement = document.createElement('div')
  if (!activeQuestionItem.value || activeQuestionItem.value.length === 0) {
    return editorElement
  }

  editorElement.innerHTML = activeQuestionItem.value
  editorElement.setAttribute('id', activeQuestionItem.htmlId)
  
  // const contentElement = html.querySelector('[id*="component-text"]') as HTMLElement
  if (editorElement) {
    editorElement.querySelectorAll('a').forEach((element) => {
        element.setAttribute('onclick', 'return false;');
        element.setAttribute('oncontextmenu', 'return false;');
    })
    return editorElement
  }
  return document.createElement('div')
}

export const AppComponents = {
  'Gmail': (Gmail),
  'SMS': SMS,
  'Dating App': DatingApp,
  'Whatsapp': Whatsapp,
  'FBMessenger': FBMessenger
}

export const getContentProps = (appName, activeQuestion: ActiveQuestion) => {
  // const html = remapHtml(content)  
  if (appName === 'Gmail') {
    return {
      senderName: getActiveQuestionElement(activeQuestion, 'component-required-sender-name'),
      senderEmail: getActiveQuestionElement(activeQuestion, 'component-required-sender-email'),
      subject: getActiveQuestionElement(activeQuestion, 'component-optional-subject'),
      content: parseEditorContent(activeQuestion['content']['body']),
      // attachments: parseAttachments(html)
    }
  } else {
    // const draggableContent = Object.keys(content)
    //   .filter(ck => ck.includes('component-text') || ck.includes('component-image'))
    //   .map(dk => content[dk])
    // const draggableContentHtml = remapHtml(draggableContent)

    // let props = {
    //   content: draggableContentHtml || document.createElement('div'),
    //   senderName: parseCustomElement(html, 'component-required-fullname'),
    // }
    
    // if (appName === 'Whatsapp' || appName === 'SMS') {
    //   props['phone'] = parseCustomElement(html, 'component-required-phone')
    // }
    // return props
  }  
}


export const getActiveQuestionElement = (activeQuestion: ActiveQuestion, htmlId: string) => {
  let foundKey = null
  let content = {...activeQuestion.content}
  // try on first level elements
  foundKey = Object.keys(content).find((contentKey) => {
    // console.log("🚀 ~ getActiveQuestionElement ~ activeQuestion:", activeQuestion)
    // console.log("🚀 ~ getActiveQuestionElement ~ contentKey:", contentKey, activeQuestion[contentKey])
    return content[contentKey].htmlId && content[contentKey].htmlId === htmlId
  })

  if (foundKey) { 
    return {
      textContent: content[foundKey].value || '',
      explanationPosition: content[foundKey].explanation
    }
  }

  return 
}

// TODO GET DRAGGABLE ITEMS
// const draggableItem = activeQuestion.content.draggableItems.find(di => {
//   return di.htmlId === htmlId
// })
//
// return {
//   textContent: draggableItem.value || '',
//   explanationPosition: activeQuestion[foundKey].explanation
// }
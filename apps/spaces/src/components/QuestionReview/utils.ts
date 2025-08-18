import { DatingApp, FBMessenger, Gmail, SMS, Whatsapp } from "@shira/ui"
import { remapHtml } from "../../utils/remapHtml"
import { ActiveQuestion, QuestionDragEditor, QuestionDragImage, QuestionEditorInput } from "../../store/types/active_question"
import { parseDragItem } from "../../utils/active_question/questionToHtml"


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
  if (appName === 'Gmail') {
    return {
      senderName: getActiveQuestionElement(activeQuestion, 'component-required-sender-name'),
      senderEmail: getActiveQuestionElement(activeQuestion, 'component-required-sender-email'),
      subject: getActiveQuestionElement(activeQuestion, 'component-optional-subject'),
      content: parseEditorContent(activeQuestion['content']['body']),
      // attachments: parseAttachments(html)
    }
  } else {   
    let props = {
      content: parseMessagingDraggableItems(activeQuestion.content.draggableItems),
      senderName: getActiveQuestionElement(activeQuestion, 'component-required-fullname'),
    }
    
    if (appName === 'Whatsapp' || appName === 'SMS') {
      props['phone'] = getActiveQuestionElement(activeQuestion, 'component-required-phone')
    }

    return props
  }  
}


export const getActiveQuestionElement = (activeQuestion: ActiveQuestion, htmlId: string) => {
  let foundKey = null
  let content = {...activeQuestion.content}

  // try on first level elements
  foundKey = Object.keys(content).find((contentKey) => {    
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

const parseMessagingDraggableItems = (items: Array<QuestionDragEditor | QuestionDragImage>) => {
  
  const htmlItems = items
    .sort((a, b) => a.position - b.position)
    .map((i) => {
      return parseDragItem(i)
    })

  console.log("🚀 ~ parseMessagingDraggableItems ~ htmlItems:", htmlItems)

  if (htmlItems.length === 0) {
    return document.createElement('div')
  }

  return remapHtml(htmlItems)
  // draggableContentHtml || document.createElement('div')
  
  // const draggableContent = Object.keys(content)
    //   .filter(ck => ck.includes('component-text') || ck.includes('component-image'))
    //   .map(dk => content[dk])
    // const draggableContentHtml = remapHtml(draggableContent)
}

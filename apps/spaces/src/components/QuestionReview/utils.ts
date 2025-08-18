import { DatingApp, FBMessenger, Gmail, SMS, Whatsapp } from "@shira/ui"
import { remapHtml } from "../../utils/remapHtml"
import { ActiveQuestion, QuestionDragAttachment, QuestionDragEditor, QuestionDragImage, QuestionEditorInput } from "../../store/types/active_question"
import { parseDragItem } from "../../utils/active_question/questionToHtml"

const parseEditorContent = (activeQuestionItem: QuestionEditorInput): HTMLElement => {
  const editorElement = document.createElement('div')
  if (!activeQuestionItem.value || activeQuestionItem.value.length === 0) {
    return editorElement
  }

  editorElement.innerHTML = activeQuestionItem.value
  editorElement.setAttribute('id', activeQuestionItem.htmlId)
  
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
      attachments: getActiveQuestionAttachments(activeQuestion)
    }
  } else {   
    let props = {
      content: parseDraggableItems(activeQuestion.content.draggableItems),
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

const getActiveQuestionAttachments = (activeQuestion: ActiveQuestion) => {
  const attachments = Array.from(activeQuestion.content.draggableItems).map((a: QuestionDragAttachment) => {
    return {
      name: a.value.name,
      position: a.position,
      explanationPosition: a.explanation,
      fileType: a.value.type
    }
  })

  return attachments
}

const parseDraggableItems = (items: Array<QuestionDragEditor | QuestionDragImage | QuestionDragAttachment>) => {
  
  const htmlItems = items
    .sort((a, b) => a.position - b.position)
    .map((i) => {
      return parseDragItem(i)
    })

  if (htmlItems.length === 0) {
    return document.createElement('div')
  }

  return remapHtml(htmlItems)
}

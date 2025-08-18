import { AttachmentType } from "@shira/ui"
import { QuestionPayload } from "../../fetch/question"
import { ActiveQuestion, EmailContent, QuestionDragAttachment, QuestionDragEditor, QuestionDragImage, QuestionEditorInput, QuestionTextInput } from "../../store/types/active_question"

const replaceImage = (question: QuestionPayload, htmlContent: Document) => {
  // images 
    if (question.images.length > 0) {
      htmlContent.querySelectorAll('img[data-image-id]')
        .forEach((img) => {
          const imgElement = question.images.find(i => i.imageId === parseInt(img.getAttribute('data-image-id')))
          if (imgElement) {
            img.setAttribute("src", imgElement.url)          
          }
        })
    }
}

const parseTextElementToActiveQuestion = (html: Document, htmlId) => {
  let elementObject: QuestionTextInput = {
    value: '',
    explanation: null,
    contentType: 'text',
    htmlId
  }

  const elementHtml = html.getElementById(htmlId)
  if (elementHtml) {
   elementObject.value = elementHtml.innerText
   elementObject.explanation = elementHtml.getAttribute('data-explanation')
  }

  return elementObject
}

const parseEditorElementToActiveQuestion = (html: Document, htmlId) => {
  let elementObject: QuestionEditorInput = {
    value: '',
    contentType: 'editor',
    htmlId
  }

  const elementHtml = html.getElementById(htmlId)
  if (elementHtml) {
   elementObject.value = elementHtml.innerHTML
  }

  return elementObject
}


const parseMessageDragItems = (htmlContent: Document) => {
  let draggableItems: Array<QuestionDragImage | QuestionDragEditor | QuestionDragAttachment> = []
  htmlContent
    .querySelectorAll('[id*="component-image"]')
    .forEach((c) => {
      const explId = c.getAttribute('data-explanation')
      draggableItems.push({
        draggableId: crypto.randomUUID(),
        htmlId: c.getAttribute('id'),
        contentType: 'image',
        position: parseInt(c.getAttribute('data-position')),
        explanation: explId,
        value: {
          url: c.getAttribute('src'),
          id: c.getAttribute('data-image-id'),
          originalFilename: c.getAttribute('alt')
        }
      })
    })

  htmlContent
    .querySelectorAll('[id*="component-text"]')
    .forEach((c) => {
      draggableItems.push({
        draggableId: crypto.randomUUID(),
        htmlId: c.getAttribute('id'),
        contentType: 'editor',
        position: parseInt(c.getAttribute('data-position')),
        value: c.innerHTML || null
      })
    })

  return draggableItems.sort((a, b) => a.position - b.position)
}

const parseEmailDragItems = (htmlContent: Document) => {
  let draggableItems: Array<QuestionDragAttachment> = []
  htmlContent
    .querySelectorAll('[id*="component-attachment"]')
    .forEach((c) => {
      draggableItems.push({
        draggableId: crypto.randomUUID(),
        htmlId: c.getAttribute('id'),
        contentType: 'attachment',
        position: parseInt(c.getAttribute('data-position')),
        explanation: c.getAttribute('data-explanation'),
        value: {
          name: c.innerHTML || null,
          type: c.getAttribute('data-attachment-type') as AttachmentType
        }
      })
    })
    
  return draggableItems.sort((a, b) => a.position - b.position)
}

export const htmlToActiveQuestion = (question: QuestionPayload, html: Document) => {
  const app = question.apps[0]
  
  let activeQuestion: ActiveQuestion = {
    app: app,
    name: question.name,
    isPhishing: !!(question.isPhising),
    content: {}
  }

  replaceImage(question, html)

  if (app.type === 'email') {
    activeQuestion.content = {
      senderName: parseTextElementToActiveQuestion(html, 'component-required-sender-name'),
      senderEmail: parseTextElementToActiveQuestion(html, 'component-required-sender-email'),      
      subject: parseTextElementToActiveQuestion(html ,'component-optional-subject'),
      body: parseEditorElementToActiveQuestion(html, 'component-text-1'),
      draggableItems: parseEmailDragItems(html)
    }
  } else {
    activeQuestion.content = {
      senderName: parseTextElementToActiveQuestion(html, 'component-required-fullname'),
      senderPhone: parseTextElementToActiveQuestion(html, 'component-required-phone'),
      draggableItems: parseMessageDragItems(html)
    }
  }

  return activeQuestion
}


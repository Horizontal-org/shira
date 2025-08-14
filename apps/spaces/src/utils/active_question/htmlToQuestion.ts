import { QuestionPayload } from "../../fetch/question"
import { ActiveQuestion, EmailContent, QuestionEditorInput, QuestionTextInput } from "../../store/types/active_question"

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
    }
  }

  return activeQuestion
}




// export const getQuestionValues = (question: QuestionPayload, htmlContent: Document) => {
//   const app = question.apps[0]

//   if (app.type === 'email') {
//     // let attachments: AttachmentFile[] = []
//     // htmlContent.querySelectorAll('[id*="component-attachment"]').forEach((ca) => {
//     //   const explodedId = ca.getAttribute('id').split('component-attachment-')
//     //   const explanationIndex = ca.getAttribute('data-explanation')
      
//     //   attachments.push({
//     //     id: parseInt(explodedId[1]),
//     //     type: AttachmentType[ca.getAttribute('data-attachment-type')],
//     //     name: ca.innerHTML,
//     //     explanationIndex: explanationIndex ? parseInt(explanationIndex) : null
//     //   })
//     // })

    
      
//     return {
//       app: app,
//       name: question.name,
//       isPhishing: !!(question.isPhising),
//       emailContent: {
//         senderEmail: htmlContent.getElementById('component-required-sender-email')?.innerText,
//         senderName: htmlContent.getElementById('component-required-sender-name')?.innerText,
//         subject: htmlContent.getElementById('component-optional-subject')?.innerText,
//         body: htmlContent.getElementById('component-text-1')?.innerHTML,
//       },
//       attachments: []     
//     }
//   } else {
  
//     replaceImage(question, htmlContent)
    
//     return {
//       app: app,
//       name: question.name,
//       isPhishing: !!(question.isPhising),
//       messagingContent: {
//         senderPhone: htmlContent.getElementById('component-required-phone')?.innerText,
//         senderName: htmlContent.getElementById('component-required-fullname')?.innerText,
//         draggableItems: getDraggableItems(htmlContent)
//       },
//     }
//   }
// }

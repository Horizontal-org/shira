import { AttachmentType } from "@shira/ui"
import { QuestionPayload } from "../../fetch/question"
import { AttachmentFile } from "../QuestionContent/components/Attachments"

export const getContentObject = (htmlContent: Document) => {
  let parsed = {}
  htmlContent.querySelectorAll('[id]:not([id=""]):not([id="type-content"]):not([id="dynamic-content"])')
    .forEach((element) => {      
      parsed[element.getAttribute('id')] = element.outerHTML
    })  
  
  return parsed
}

export const getQuestionValues = (question: QuestionPayload, htmlContent: Document) => {
  console.log("🚀 ~ getQuestionValues ~ question:", question)
  const app = question.apps[0]

  if (app.type === 'email') {
    let attachments: AttachmentFile[] = []
    htmlContent.querySelectorAll('[id*="component-attachment"]').forEach((ca) => {
      const explodedId = ca.getAttribute('id').split('component-attachment-')
      const explanationIndex = ca.getAttribute('data-explanation')
      
      console.log("🚀 ~ htmlContent.querySelectorAll ~ explodedId:", explodedId)
      console.log('INNER HTML', ca.innerHTML)
      attachments.push({
        id: parseInt(explodedId[1]),
        type: AttachmentType[ca.getAttribute('data-attachment-type')],
        name: ca.innerHTML,
        explanationIndex: explanationIndex ? parseInt(explanationIndex) : null
      })
    })

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
      
    return {
      app: app,
      name: question.name,
      isPhishing: !!(question.isPhising),
      emailContent: {
        senderEmail: htmlContent.getElementById('component-required-sender-email')?.innerText,
        senderName: htmlContent.getElementById('component-required-sender-name')?.innerText,
        subject: htmlContent.getElementById('component-optional-subject')?.innerText,
        body: htmlContent.getElementById('component-text-1')?.innerHTML,
      },
      attachments: attachments     
    }
  }
}
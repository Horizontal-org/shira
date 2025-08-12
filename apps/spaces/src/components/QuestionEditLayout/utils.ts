import { AttachmentType } from "@shira/ui"
import { QuestionPayload } from "../../fetch/question"


const getDraggableItems = (htmlContent: Document) => {

  let draggableItems = []
  htmlContent
    .querySelectorAll('[id*="component-image"]')
    .forEach((c) => {
      const explId = c.getAttribute('data-explanation')
      draggableItems.push({
        draggableId: crypto.randomUUID(),
        name: c.getAttribute('id'),
        type: 'image',
        position: c.getAttribute('data-position'),
        explId: explId ? parseInt(explId) : null,
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
        name: c.getAttribute('id'),
        type: 'text',
        position: c.getAttribute('data-position'),
        value: c.innerHTML || null
      })
    })

  //TODO add draggable items attachments

  return draggableItems.sort((a, b) => a.position - b.position)
}

export const getContentObject = (htmlContent: Document) => {
  let parsed = {}
  htmlContent.querySelectorAll('[id]:not([id=""]):not([id="type-content"]):not([id="dynamic-content"])')
    .forEach((element) => {      
      parsed[element.getAttribute('id')] = element.outerHTML
    }
  )  

  return parsed
}

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

export const getQuestionValues = (question: QuestionPayload, htmlContent: Document) => {
  const app = question.apps[0]

  if (app.type === 'email') {
    // let attachments: AttachmentFile[] = []
    // htmlContent.querySelectorAll('[id*="component-attachment"]').forEach((ca) => {
    //   const explodedId = ca.getAttribute('id').split('component-attachment-')
    //   const explanationIndex = ca.getAttribute('data-explanation')
      
    //   attachments.push({
    //     id: parseInt(explodedId[1]),
    //     type: AttachmentType[ca.getAttribute('data-attachment-type')],
    //     name: ca.innerHTML,
    //     explanationIndex: explanationIndex ? parseInt(explanationIndex) : null
    //   })
    // })

    replaceImage(question, htmlContent)
      
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
      attachments: []     
    }
  } else {
  
    replaceImage(question, htmlContent)
    
    return {
      app: app,
      name: question.name,
      isPhishing: !!(question.isPhising),
      messagingContent: {
        senderPhone: htmlContent.getElementById('component-required-phone')?.innerText,
        senderName: htmlContent.getElementById('component-required-fullname')?.innerText,
        draggableItems: getDraggableItems(htmlContent)
      },
    }
  }
}

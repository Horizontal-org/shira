import { TextInput } from "@shira/ui";
import { Explanation } from "../../store/slices/explanation";
import { ActiveQuestion, QuestionDragEditor, QuestionDragImage, QuestionEditorInput, QuestionTextInput } from "../../store/types/active_question";


// const getHtmlByType = (appType, questionContent) => {
//     let keys = []
//     if (appType === 'email') {
//       keys.push(
//         'component-required-sender-name',
//         'component-required-sender-email',
//         'component-optional-subject'
//       )      
//     } else if (appType === 'messaging') {
//       keys.push(
//         'component-required-fullname',
//         'component-required-phone',
//       )      
//     }
    
//     return Object.keys(questionContent)
//       .filter(c => keys.includes(c))
//       .reduce((prev, current) => {
//         return prev + questionContent[current]
//       }, `<div id='type-content'>`) + '</div>'
// }

// const parseRequest = (question, explanations, quizId) => {
//   let typeHtml = getHtmlByType(question.app.type, question.content)
  
//   // const requiredHTML = Object.keys(requiredContent).reduce((prev, current) => {
//   //   return prev + requiredContent[current]
//   // }, `<div id='required-content'>`) + '</div>'
  
//   // const optionalHTML = Object.keys(optionalContent).reduce((prev, current) => {
//   //   return prev + optionalContent[current]
//   // }, `<div id='optional-content'>`) + '</div>'

//   const dynamicHTML = Object.keys(question.content)
//     .filter(qk => qk.includes('component-text') || qk.includes('component-attachment') || qk.includes('component-image'))
//     .reduce((prev, current) => {
//       return prev + question.content[current]
//     }, `<div id='dynamic-content'>`) + '</div>'


export const activeQuestionToHtml = (activeQuestion: ActiveQuestion) => {
  if (activeQuestion.app.type === 'email') {
    // parse as email
    return parseActiveQuestionToHtml(activeQuestion.content)  
  } else {
    return parseActiveQuestionToHtml(activeQuestion.content)
    console.log('parse message')
  }
}

const parseActiveQuestionToHtml = (content: Object) => {
  let elementsArray = []
  const keys = Object.keys(content)
  keys.forEach(k => {
    if (k === 'draggableItems') {
      content[k].forEach((di) => {
        elementsArray.push(parseDragItem(di))
      })
    } else if (content[k].contentType === 'text') {
      elementsArray.push(parseQuestionTextInput(content[k]))
    } else if (content[k].contentType === 'editor') {
      elementsArray.push(parseQuestionEditorInput(content[k]))
    } else if (content[k].contentType === 'attachment') {
      console.log('parse attachments')
    }
  })
  
  const html = elementsArray
    .reduce((prev, current) => {
      return prev + current
    }, `<div id='dynamic-content'>`) + '</div>'
    
  console.log("🚀 ~ parseEmailActiveQuestionToHtml ~ elementsArray:", elementsArray)
  console.log("🚀 ~ parseEmailActiveQuestionToHtml ~ html:", html)

  return html
}

// `<span ${insertExplanation(expl)} id=component-optional-subject>${value}</span>` 
const parseQuestionTextInput = (textInput: QuestionTextInput) => {
  const textElement = document.createElement('span')
  textElement.innerHTML = textInput.value
  textElement.setAttribute('id', textInput.htmlId)
  if (textInput.explanation) {
    textElement.setAttribute('data-explanation', textInput.explanation)
  }
  return textElement.outerHTML
}

// `<div data-position=1 id=component-text-1>${emailText}</div>`
const parseQuestionEditorInput = (editorInput: QuestionEditorInput, returnType: 'string' | 'html' = 'string') => {
  const editorElement = document.createElement('div')
  editorElement.innerHTML = editorInput.value
  editorElement.setAttribute('id', editorInput.htmlId)
  editorElement.querySelectorAll('a').forEach((element) => {
    element.setAttribute('onclick', 'return false;');
    element.setAttribute('oncontextmenu', 'return false;');
  })
  return returnType === 'string' ? editorElement.outerHTML : editorElement
}

const parseQuestionDragImage = (imageInput: QuestionDragImage) => {
  const imageElement = document.createElement('img')
  imageElement.setAttribute('id', imageInput.htmlId)
  imageElement.setAttribute('alt', imageInput.value.originalFilename)
  imageElement.setAttribute('data-image-id', imageInput.value.id)
  imageElement.setAttribute('src', imageInput.value.url)
  if (imageInput.explanation) {
    imageElement.setAttribute('data-explanation', imageInput.explanation)
  }
  return imageElement
}
// `<div data-position=${index} data-attachment-type=${ni.value.type} id=component-attachment-${index} ${insertExplanation(ni.explId || null)}>${ni.value.name || ''}</div>` 
// const parseQuestionDragAttachmentInput = () => (dragAttachment: any) => {
// }

//       let objectAttributes = ''
  //       if (imageObject) {
  //         objectAttributes = `data-image-id=${imageObject.id} alt=${imageObject.originalFilename} src=${imageObject.url}`
  //       }
  //       newContent[`component-image-${index}`] = `<img data-position=${index} id=component-image-${index} ${insertExplanation(ni.explId || null)} ${objectAttributes} />` 
export const parseDragItem = (item: QuestionDragEditor | QuestionDragImage) => {
  let element = null
  if (item.contentType === 'image') {
    element = parseQuestionDragImage(item)
  } else if (item.contentType === 'editor') {
    element = parseQuestionEditorInput(item, 'html')    
  }
  // add attachments here ? 

  element.setAttribute('data-position', item.position)
  return element.outerHTML
}

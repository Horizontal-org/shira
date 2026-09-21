import { sanitizeEmailHtml } from '@horizontal-org/shira-ui';
import { ActiveQuestion, QuestionDragAttachment, QuestionDragEditor, QuestionDragImage, QuestionEditorInput, QuestionTextInput } from "../../store/types/active_question";

export const activeQuestionToHtml = (activeQuestion: ActiveQuestion) => {
  const advanced = activeQuestion.app?.type === 'email' && activeQuestion.editorType === 'advanced'
  const content = advanced ? {
    ...activeQuestion.content,
    body: {
      ...activeQuestion.content['body'],
      value: sanitizeEmailHtml(activeQuestion.content['body']?.value ?? '')
    }
  } : activeQuestion.content
  const html = parseActiveQuestionToHtml(content)
  if (!advanced) return html

  const container = document.createElement('div')
  container.innerHTML = html
  const body = container.querySelector('#component-text-1')
  body?.querySelectorAll('[data-explanation]').forEach(element => {
    element.removeAttribute('data-explanation')
  })
  body?.classList.add('advanced-html-editor')
  return container.innerHTML
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
    }
  })

  const html = elementsArray
    .reduce((prev, current) => {
      return prev + current
    }, `<div id='dynamic-content'>`) + '</div>'

  return html
}

const parseQuestionTextInput = (textInput: QuestionTextInput) => {
  const textElement = document.createElement('span')
  textElement.innerHTML = textInput.value
  textElement.setAttribute('id', textInput.htmlId)
  if (textInput.explanation) {
    textElement.setAttribute('data-explanation', textInput.explanation)
  }
  return textElement.outerHTML
}

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
  if (!imageInput.value) {
    return null
  }

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

const parseQuestionDragAttachment = (attachmentInput: QuestionDragAttachment) => {
  const attachmentElement = document.createElement('div')
  attachmentElement.setAttribute('id', attachmentInput.htmlId)
  attachmentElement.setAttribute('data-attachment-type', attachmentInput.value.type)
  attachmentElement.innerHTML = attachmentInput.value.name

  if (attachmentInput.explanation) {
    attachmentElement.setAttribute('data-explanation', attachmentInput.explanation)
  }
  return attachmentElement
}

export const parseDragItem = (item: QuestionDragEditor | QuestionDragImage | QuestionDragAttachment) => {
  let element = null
  if (item.contentType === 'image') {
    element = parseQuestionDragImage(item)
  } else if (item.contentType === 'editor') {
    element = parseQuestionEditorInput(item, 'html')
  } else if (item.contentType === 'attachment') {
    element = parseQuestionDragAttachment(item)
  }

  if (!element) {
    return ''
  }

  element.setAttribute('data-position', item.position)
  return element.outerHTML
}

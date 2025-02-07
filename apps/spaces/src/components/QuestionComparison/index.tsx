import { FunctionComponent, useMemo } from "react";
import styled, { createGlobalStyle } from 'styled-components'

import { renderToStaticMarkup } from "react-dom/server";
import { QuestionWithLanguages } from "../ManageGlobalLanguages/components/QuestionDetails";

interface Props {
  currentQuestion: any;
  newQuestion: QuestionWithLanguages
  currentLang: string;
}

export const filterExplanations = (ex, lang) => {
  let htmlChildren = ''
  ex.forEach((e) => {
    const translation = e.explanationTranslations.find(et => et.languageId.code == lang)
    if (translation) {
      htmlChildren += `<div data-explanation-id='${translation.id}'>${translation.content}</div>`
    }
  })
  
  if (htmlChildren.length > 0) {
    return new DOMParser().parseFromString("<div id='explanations'>" + htmlChildren + '</div>', 'text/html').getElementById('explanations')
  }
}

const removeLineBreaks = (s) => {
  if (s && s.length > 0) {
    return s.replace(/\n|\r/g, "")
  }
  return ''
}

export const QuestionComparison: FunctionComponent<Props> = ({
  currentQuestion,
  newQuestion,
  currentLang
}) => {

  const content = useMemo(() => {
    if  (!currentQuestion) return []

    let nodes = []
    const qt = currentQuestion.questionTranslations.find((q) => q.languageId.code === currentLang)
    const oldHtmlContent = new DOMParser().parseFromString(qt ? qt.content : '', 'text/html')
    const oldRequired = oldHtmlContent.getElementById('required-content')
    const oldOptional = oldHtmlContent.getElementById('optional-content')
    const oldDynamic = oldHtmlContent.getElementById('dynamic-content')
    const oldExplanations = filterExplanations(currentQuestion.explanations, currentLang)    

    const newQ = newQuestion.langs.find(l => l.lang === currentLang)
    const htmlContent = newQ ? newQ.questionElement.outerHTML : ''
    
    const newHtmlContent = new DOMParser().parseFromString(htmlContent, 'text/html')
    const newRequired = newHtmlContent.getElementById('required-content')
    const newOptional = newHtmlContent.getElementById('optional-content')
    const newDynamic = newHtmlContent.getElementById('dynamic-content')
    const newExplanations = newQ ? newQ.explanationElement : null


    nodes.push(
      {
        old: oldRequired,
        new: newRequired,
        label: 'Required content'
      },
      {
        old: oldOptional,
        new: newOptional,
        label: 'Optional content'
      },
      {
        old: oldDynamic,
        new: newDynamic,
        label: 'Dynamic content'
      },
      {
        old: oldExplanations,
        new: newExplanations,
        label: 'Explanations'
      },
    )

    return nodes
  }, [currentLang, currentQuestion, newQuestion])  
  console.log("🚀 ~ file: index.tsx:79 ~ content ~ content:", content)

  if (!currentQuestion) {
    return (
      <p>
        ...Loading
      </p>
    )
  }

  return (
    <div>
      <Titles>
        <h4>Current content</h4>        
        <h4>New content</h4>        
      </Titles>
      <ContentStyles />
      {content.map((c, k) => (
        <div key={k}>
          { (c.old || c.new) && (
            <>
              <ContentTitle>{c.label}</ContentTitle>
              <ContentBlock             
                hasContent={!!(c.old || c.new)}
                contentChanged={c.label === 'Explanations' ? removeLineBreaks(c.old?.outerText) !== removeLineBreaks(c.new?.outerText) : c.old?.outerHTML !== c.new?.outerHTML }
              >
                <div 
                  dangerouslySetInnerHTML={{
                    __html: c.old?.outerHTML || ''
                  }}
                ></div>
                <div dangerouslySetInnerHTML={{
                    __html: c.new?.outerHTML || ''
                }}></div>
              </ContentBlock>
            </>
          )}
          
        </div>
      ))}

      { content.length === 0 && (
        <NoContent>
          No content for this translation          
        </NoContent>
      )}
    </div>    
  )
}
const ContentBlock = styled.div`
  display: flex;
  flex: 1;
  width: 100%;

  ${props => props.hasContent && `
    > div {
      width: 45%;
      margin: 10px 6px;
      > div {
        padding: 4px 12px;
        border: 2px solid ${props.contentChanged ? '#50AFD8' : '#ececec' };
        border-radius: 4px;
      }  
    }
  `} 

`
const NoContent = styled.div`
  padding: 10px 6px;
`

const Titles = styled.div`
  display: flex;
  width: 100%;
  > h4 {
    width: 45%;
    padding-left: 10px;
  } 
`

const ContentStyles = createGlobalStyle`
  span {
    display: block;
    width: 100%;
  }
`

const ContentTitle = styled.div`
  font-weight: 700;
  padding-left: 8px;
  margin: 10px 0;
`
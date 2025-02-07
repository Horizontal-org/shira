import { FunctionComponent } from "react";
import styled from 'styled-components'

interface Props {
  oldTranslation: any;
  newFile: {
    question: HTMLElement
    explanation: HTMLElement
  };
}

export const ContentComparison: FunctionComponent<Props> = ({
  oldTranslation,
  newFile
}) => {

  return (
    <Comparison>
      <div>
        { oldTranslation ? (
          <>
            <p>Question Content</p>
            <div 
            id='question-translation'
            dangerouslySetInnerHTML={{
              __html: oldTranslation.content
            }}></div>
          </>
        ) : (
          <>
            <p>Question Content</p>
            <div>No content for this language</div>
          </>
        )}
        
      </div>
      <div>
        { newFile ? (
          <>
            <p>Question Content</p>
            <div 
              id='question-translation'
              dangerouslySetInnerHTML={{
                __html: newFile.question.innerHTML
              }}></div>

              { newFile.explanation && (
                <>
                  <p>Question Content</p>
                  <div 
                    id='question-translation'
                    dangerouslySetInnerHTML={{
                      __html: newFile.explanation.innerHTML
                  }}></div>
                </>
              )}          
          </>
        ) : (
          <>
            <p>Question Content</p>
            <div>No new content for this language</div>
          </>
        )}
      </div>
    </Comparison>
  )
}

const Comparison = styled.div`
  display: flex;
 
  > div {
    flex: 1;
  }
`
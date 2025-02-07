import { FunctionComponent } from "react";
import styled from 'styled-components'
import { filterExplanations } from "../../utils/explanations";
import StyledContent from "../StyledContent";

interface Props {
  translation: any;
  explanations: any;
  langId: number;
}


export const OriginalLanguage: FunctionComponent<Props> = ({
  translation,
  explanations,
  langId
}) => {
  
  return (
    <div>
      <h4>
        Original content - { translation.languageId.name }
      </h4>

      <h5>Question</h5>
      <StyledContent dangerouslySetInnerHTML={{
        __html: translation.content
        }}>
      </StyledContent>

      <ContentSeparation />

      <h5>Explanations</h5>
      <StyledContent>
        <div>
          { filterExplanations(explanations, langId) }
        </div>
      </StyledContent>
    </div>
  )
}

const ContentSeparation = styled.div`
  margin: 10px 0;
`
import { FunctionComponent } from 'react'
import { styled } from '@shira/ui'
import { UIExplanation } from '../../QuestionPreview'

//TODO FIX DOUBLE IMPORT, PROBLEM WITH SHIRA-UI
import '../../../fonts/GoogleSans/style.css'
import '../../../fonts/Segoe/style.css'
import './styles.css'
import { MailApps } from '../AppTypes/MailApps'
import { MessagingApps } from '../AppTypes/MessagingApps'

interface Props {
  appName: string;
  content: string;
  explanations?: UIExplanation[];
  explanationNumber: number;
  showExplanations: boolean;
  images?: Array<{ imageId: number; url: string }>;
}

export const AppLayout: FunctionComponent<Props> = ({
  appName,
  content,
  explanations,
  explanationNumber,
  showExplanations,
  images
}) => {
  return (
    <Wrapper className="apps-container">

      <MailApps
        content={content}
        name={appName}
        images={images}
        explanations={explanations}
        explanationNumber={explanationNumber}
        showExplanations={showExplanations}
      />

      <MessagingApps
        content={content}
        name={appName}
        explanations={explanations}
        explanationNumber={explanationNumber}
        showExplanations={showExplanations}
      />

    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: ${props => props.theme.colors.light.white};
  height: 100%;
  padding-bottom: 10px;
  box-sizing: border-box;
`

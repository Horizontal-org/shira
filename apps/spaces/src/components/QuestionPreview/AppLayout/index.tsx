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

      {showExplanations && (<Overlay />)}

    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: calc(100vh - 86px);
  max-height: calc(100vh - 86px);
  overflow-y: scroll;
  background: ${props => props.theme.colors.light.white};
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: calc(100vh - 86px);
  width: 100%;
  background: rgba(0,0,0,0.5);
`

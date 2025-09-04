import { FunctionComponent } from 'react'
import { styled } from '@shira/ui'
import { App } from '../../../domain/app'
import { Explanation } from '../../../domain/explanation'
import { MailApps } from '../../UI/AppTypes/MailApps'
import { MessagingApps } from '../../UI/AppTypes/MessagingApps'

//TODO FIX DOUBLE IMPORT, PROBLEM WITH SHIRA-UI
import '../../../fonts/GoogleSans/style.css'
import '../../../fonts/Segoe/style.css'
import './styles.css'

interface Props {
  app: App
  content: string
  explanations?: Explanation[]
  explanationNumber: number
  answer: string | null
  showExplanations: boolean
  images?: Array<{ imageId: number; url: string }>
}

export const AppLayout: FunctionComponent<Props> = ({
  app,
  content,
  explanations,
  explanationNumber,
  answer,
  showExplanations,
  images
}) => {
  return (
    <Wrapper className="apps-container">

      <MailApps 
        content={content}
        name={app.name}
        images={images}
        explanations={explanations}
        explanationNumber={explanationNumber}
        showExplanations={showExplanations}
      />      

      <MessagingApps
        content={content}
        name={app.name}
        explanations={explanations}
        explanationNumber={explanationNumber}
        showExplanations={showExplanations}
      />

      {answer && (<Overlay />)}

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

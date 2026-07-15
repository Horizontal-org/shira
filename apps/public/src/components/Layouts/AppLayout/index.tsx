import { FunctionComponent } from 'react'
import { styled } from '@horizontal-org/shira-ui'
import { App } from '../../../domain/app'
import { Explanation } from '../../../domain/explanation'
import { MailApps } from '../../UI/AppTypes/MailApps'
import { MessagingApps } from '../../UI/AppTypes/MessagingApps'

//TODO FIX DOUBLE IMPORT, PROBLEM WITH SHIRA-UI
import '../../../fonts/GoogleSans/style.css'
import '../../../fonts/Segoe/style.css'

interface Props {
  app: App
  content: string
  explanations?: Explanation[]
  explanationNumber: number
  answer: string | null
  showExplanations: boolean
  images?: Array<{ imageId: number; url: string }>
}

const isPhoneApp = (appName: string) => appName === 'SMS' || appName === 'Dating App';

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
    <Wrapper className="apps-container" $isPhoneFrame={isPhoneApp(app.name)}>

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
        images={images}
        explanations={explanations}
        explanationNumber={explanationNumber}
        showExplanations={showExplanations}
      />

      {answer && (<Overlay />)}

    </Wrapper>
  )
}

const Wrapper = styled.div<{ $isPhoneFrame: boolean }>`
  height: calc(100vh - 86px);
  max-height: calc(100vh - 86px);
  overflow-y: scroll;
  background: ${props => props.theme.colors.light.paleGreen};

  ${props => props.$isPhoneFrame && `
    > div > div {
      filter: drop-shadow(-2px -2px 10px rgba(0, 130, 251, 0.14));
    }
  `}
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

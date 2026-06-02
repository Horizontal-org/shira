import { FunctionComponent } from 'react'
import { styled } from '@horizontal-org/shira-ui'
import { UIExplanation } from '../../QuestionPreview'
import { MailApps } from '../AppTypes/MailApps'
import { MessagingApps } from '../AppTypes/MessagingApps'
import { normalizePreviewAppName } from '../../../utils/appNames'

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
  const resolvedAppName = normalizePreviewAppName(appName);

  return (
    <Wrapper className="apps-container">

      <MailApps
        content={content}
        name={resolvedAppName}
        images={images}
        explanations={explanations}
        explanationNumber={explanationNumber}
        showExplanations={showExplanations}
      />

      <MessagingApps
        content={content}
        name={resolvedAppName}
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

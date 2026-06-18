import { FunctionComponent } from "react";
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Button } from "./Button";

import MeetNowRegular from './MeetNowRegular'
import Teams from './Teams'
import Calendar from './Calendar'
import Alert from './Alert'
import Settings from './Settings'
import Avatar from './Avatar'
import More from './More'

interface Props {}

export const Right:FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Button hide="second">
        <MeetNowRegular />
        <span>{t('outlook.meet_now')}</span>
      </Button>
      <Button hide="first">
        <Teams />
      </Button>
      <Button hide="first">
        <Calendar />
      </Button>
      <Button hide="first">
        <Alert />
      </Button>
      <Button hide="first">
        <Settings />
      </Button>
      <Button hide="desktop">
        <More />
      </Button>
      <Button hide="never">
        <AvatarWrapper>
          <Avatar />
        </AvatarWrapper>
      </Button>
    </Wrapper>
  )
}

const AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  
  > svg {
    width: 32px;
    height: 32px; 
  }
`

const Wrapper = styled.div`
  display: flex;
`
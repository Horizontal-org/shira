import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ImageIcon from './ImageIcon'
import LandscapeIcon from './LandscapeIcon'
interface Props {}

export const Footer: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <ImageIcon />
      <LandscapeIcon />
      <div>
        {t('sms.text_message')}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #F3F3F3;

  > svg {
    margin-inline-end: 8px;
  }

  > div {
    cursor: pointer;
    width: 70%;
    text-align: start;
    border-radius: 30px;
    background: #fff;
    font-size: 12px;
    color: #aaa;
    padding: 8px 12px;
    margin-inline-start: 8px;
  }
`

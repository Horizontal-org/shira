import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
}

const ContactNotice: FunctionComponent<Props> = ({ phone }) => {
  const { t } = useTranslation('shira-ui')

  if (!phone?.textContent) {
    return null
  }

  return (
    <NoticeCard>
      <CardName>{phone.textContent}</CardName>
      <CardSubtitle>{t('telegram.not_a_contact')}</CardSubtitle>
      <CardRow>
        <CardLabel>{t('telegram.registration')}</CardLabel>
        <CardValue>Jun 2023</CardValue>
      </CardRow>
      <CardRow>
        <CardLabel>{t('telegram.phone_number')}</CardLabel>
        <CardValue>{phone.textContent}</CardValue>
      </CardRow>
      <NotOfficial>{t('telegram.not_official_account')}</NotOfficial>
    </NoticeCard>
  )
}

const NoticeCard = styled.div`
  margin: 0 16px 16px;
  padding: 0 16px;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 0 10px 16px;
    padding: 14px 16px;
    border-radius: 16px;
    background: rgba(3, 155, 229, 0.92);
  }
`

const CardName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #222;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: #fff;
  }
`

const CardSubtitle = styled.div`
  font-size: 12px;
  color: #8e8e93;
  margin-bottom: 8px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: rgba(255, 255, 255, 0.75);
  }
`

const CardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  margin-bottom: 2px;
`

const CardLabel = styled.span`
  color: #8e8e93;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: rgba(255, 255, 255, 0.75);
  }
`

const CardValue = styled.span`
  color: #222;
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: #fff;
  }
`

const NotOfficial = styled.div`
  margin-top: 6px;
  font-size: 11px;
  color: #8e8e93;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: rgba(255, 255, 255, 0.75);
  }
`

export default ContactNotice

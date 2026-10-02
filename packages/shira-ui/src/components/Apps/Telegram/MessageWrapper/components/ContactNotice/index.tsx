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
      <CardRows>
        <CardRow>
          <CardLabel>{t('telegram.registration')}</CardLabel>
          <CardValue>{t('telegram.registration_date')}</CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>{t('telegram.phone_number')}</CardLabel>
          <CardValue>{phone.textContent}</CardValue>
        </CardRow>
      </CardRows>
      <NotOfficial>
        <WarningIcon>!</WarningIcon>
        {t('telegram.not_official_account')}
      </NotOfficial>
    </NoticeCard>
  )
}

const NoticeCard = styled.div`
  margin: 0 16px auto;
  padding: 0 16px 20px;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    align-self: center;
    margin: 4px 0 auto;
    padding: 14px 18px 12px;
    border-radius: 16px;
    background: rgba(40, 85, 30, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
`

const CardName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #8e8e93;
  margin-bottom: 10px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 2px;
    color: #fff;
  }
`

const CardSubtitle = styled.div`
  display: none;
  font-size: 12px;
  margin-bottom: 8px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
    font-size: 14px;
    margin-bottom: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
`

const CardRows = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    gap: 4px 8px;

    /* Mobile lists the phone number before the registration date */
    > :first-child > * {
      order: 1;
    }
  }
`

const CardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  margin-bottom: 8px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: contents;
    font-size: 13px;
  }
`

const CardLabel = styled.span`
  color: #8e8e93;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 13px;
    text-align: end;
    color: rgba(255, 255, 255, 0.7);
  }
`

const CardValue = styled.span`
  color: #6d6d72;
  font-weight: 500;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 13px;
    text-align: start;
    font-weight: 600;
    color: #fff;
  }
`

const NotOfficial = styled.div`
  font-size: 16px;
  color: #8e8e93;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
  }
`

const WarningIcon = styled.span`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.75);
    color: #5d8a4f;
    font-size: 11px;
    font-weight: 700;
  }
`

export default ContactNotice

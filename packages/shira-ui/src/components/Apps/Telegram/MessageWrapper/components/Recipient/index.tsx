import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { CloseIcon } from '../../../../../Icons'
import MoreOptionsIcon from '../../../../Whatsapp/Icons/MoreOptions'
import SearchIcon from '../../../../Whatsapp/Icons/Search'
import BackArrow from '../../../../Whatsapp/Icons/BackArrow'
import StrangerPicture from '../../../../Whatsapp/StrangerPicture'

interface Props {
  onOpenSenderInfo: () => void
  showSenderInfo: boolean
  phone?: {
    textContent: string
    explanationPosition: string
  };
}

const Recipient: FunctionComponent<Props> = ({ phone, onOpenSenderInfo, showSenderInfo }) => {
  const { t } = useTranslation('shira-ui')
  const [showNotice, setShowNotice] = useState(true)

  return (
    <Wrapper>
      <Header>
        <PictureWrapper>
          <BackArrowWrapper>
            <BackArrow />
          </BackArrowWrapper>

          <Contact type="button" onClick={onOpenSenderInfo} aria-label={t('telegram.sender_info.title')} aria-expanded={showSenderInfo}>
            <StrangerPicture />
            <ContactInfo>
              <Name data-explanation={phone?.explanationPosition}>
                {phone?.textContent || ''}
              </Name>
              <LastSeen>last seen recently</LastSeen>
            </ContactInfo>
          </Contact>
        </PictureWrapper>
        <Icons>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
          <IconWrapper>
            <MoreOptionsIcon />
          </IconWrapper>
        </Icons>
      </Header>

      {showNotice && phone?.textContent && (
        <NoticeWrapper>
          <NoticeActions>
            <AddContact>Add Contact</AddContact>
            <BlockUser>Block User</BlockUser>
            <CloseWrapper onClick={() => setShowNotice(false)}>
              <CloseIcon />
            </CloseWrapper>
          </NoticeActions>

          <NoticeCard>
            <CardName>{phone.textContent}</CardName>
            <CardSubtitle>Not a contact</CardSubtitle>
            <CardRow>
              <CardLabel>Registration</CardLabel>
              <CardValue>Jun 2023</CardValue>
            </CardRow>
            <CardRow>
              <CardLabel>Phone Number</CardLabel>
              <CardValue>{phone.textContent}</CardValue>
            </CardRow>
            <NotOfficial>Not an official account</NotOfficial>
          </NoticeCard>
        </NoticeWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background: #039BE5;
  }
`

const Contact = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: 2px solid #039BE5;
    outline-offset: 4px;
  }
`

const ContactInfo = styled.div`
  margin-inline-start: 12px;
  display: flex;
  flex-direction: column;
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: #fff;
  }
`

const LastSeen = styled.span`
  font-size: 12px;
  color: #8e8e93;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: rgba(255,255,255,0.8);
  }
`

const Icons = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  margin: 0 4px;
  padding: 8px;
  cursor: pointer;
  transition: background-color .1s;
  border-radius: 50%;

  &:active {
    background: rgba(11,20,26,0.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    > svg path {
      fill: #fff;
    }
  }
`

const BackArrowWrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: inline-block;
    padding-inline-end: 8px;

    > svg path {
      fill: #fff;
    }
  }
`

const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
`

const NoticeWrapper = styled.div`
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
`

const NoticeActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-size: 13px;
`

const AddContact = styled.span`
  color: #039BE5;
  cursor: pointer;
`

const BlockUser = styled.span`
  color: #e53935;
  cursor: pointer;
  margin-inline-end: 20px;
  flex-grow: 1;
  text-align: end;
`

const CloseWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-inline-start: 12px;

  svg path {
    fill: #8e8e93;
  }
`

const NoticeCard = styled.div`
  padding: 4px 16px 16px;
  text-align: center;
`

const CardName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #222;
`

const CardSubtitle = styled.div`
  font-size: 12px;
  color: #8e8e93;
  margin-bottom: 8px;
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
`

const CardValue = styled.span`
  color: #222;
`

const NotOfficial = styled.div`
  margin-top: 6px;
  font-size: 11px;
  color: #8e8e93;
`

export default Recipient

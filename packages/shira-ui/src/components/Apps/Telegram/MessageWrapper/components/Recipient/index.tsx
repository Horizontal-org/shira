import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { LuPhone, LuSearch, LuEllipsis, LuX, LuChevronLeft, LuCircleX } from 'react-icons/lu'
import Avatar from '../../../components/Avatar'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
  showSenderInfo: boolean;
  onOpenSenderInfo: () => void;
}

const Recipient: FunctionComponent<Props> = ({ phone, showSenderInfo, onOpenSenderInfo }) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Header>
        <BackArrowWrapper>
          <LuChevronLeft />
          <UnreadBadge>{t('telegram.unread_count')}</UnreadBadge>
        </BackArrowWrapper>

        <NamePill type="button" onClick={onOpenSenderInfo} aria-label={t('telegram.sender_info.title')} aria-expanded={showSenderInfo}>
          <AvatarWrapper>
            <Avatar name={phone?.textContent} size={36} />
          </AvatarWrapper>
          <ContactInfo>
            <Name data-explanation={phone?.explanationPosition}>
              {phone?.textContent || ''}
            </Name>
            <LastSeen>{t('telegram.last_seen')}</LastSeen>
          </ContactInfo>
        </NamePill>

        <MobileAvatar type="button" onClick={onOpenSenderInfo} aria-label={t('telegram.sender_info.title')} aria-expanded={showSenderInfo}>
          <Avatar name={phone?.textContent} size={40} />
        </MobileAvatar>

        <Icons>
          <IconWrapper>
            <LuPhone />
          </IconWrapper>
          <IconWrapper>
            <LuSearch />
          </IconWrapper>
          <IconWrapper>
            <LuEllipsis />
          </IconWrapper>
        </Icons>
      </Header>

      {phone?.textContent && (
        <NoticeActions>
          <AddContact>
            <DesktopOnly>{t('telegram.add_contact')}</DesktopOnly>
            <MobileOnly>{t('telegram.add_to_contacts')}</MobileOnly>
          </AddContact>
          <BlockUser>{t('telegram.block_user')}</BlockUser>
          <CloseWrapper>
            <DesktopOnly><LuX /></DesktopOnly>
            <MobileOnly><LuCircleX /></MobileOnly>
          </CloseWrapper>
        </NoticeActions>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px 4px;
  background: #fff;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0;
    padding: 8px 0 0;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;

    &::before {
      content: '';
      position: absolute;
      inset: 0 0 -24px;
      z-index: -1;
      pointer-events: none;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.25), transparent);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      mask-image: linear-gradient(to bottom, #000 55%, transparent);
      -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent);
    }
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: 6px 12px 0;
    gap: 8px;
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

  &:focus-visible {
    outline: 2px solid #039BE5;
    outline-offset: 4px;
  }
`

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-inline-end: 12px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const MobileAvatar = styled(Contact)`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    justify-self: end;
    padding: 2px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    /* Telegram's cyan user color */
    > div > div {
      background: linear-gradient(180deg, #5fe2ee 0%, #1cb0cd 100%);
    }
  }
`

const NamePill = styled(Contact)`
  display: flex;
  align-items: center;
  min-width: 0;
  flex-grow: 1;
  padding: 6px 12px 6px 6px;
  border-radius: 999px;
  background: #f4f4f5;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: center;
    padding: 5px 30px;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`

const ContactInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    align-items: center;
  }
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.2;
  }
`

const LastSeen = styled.span`
  font-size: 14px;
  color: #8e8e93;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 13px;
    line-height: 1.2;
    color: #6d6d72;
  }
`

const Icons = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 16px;
  border-radius: 999px;
  background: #f4f4f5;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const IconWrapper = styled.div`
  display: flex;
  cursor: pointer;

  > svg {
    display: block;
    width: 26px;
    height: 26px;
    color: #000;
    stroke-width: 1.6;
  }
`

const BackArrowWrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    justify-self: start;
    gap: 2px;
    height: 44px;
    padding: 0 8px 0 6px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    > svg {
      width: 26px;
      height: 26px;
      color: #000;
      stroke-width: 2.4;
    }
  }
`

const UnreadBadge = styled.span`
  padding: 1px 7px;
  border-radius: 999px;
  background: #000;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`

const NoticeActions = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 999px;
  background: #f4f4f5;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 8px 12px 0;
    padding: 14px 18px;
    font-size: 17px;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`

const AddContact = styled.span`
  flex: 1;
  text-align: center;
  color: #000;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 2;
    color: #1e88e5;
  }
`

const BlockUser = styled.span`
  flex: 1;
  text-align: center;
  color: #e53935;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 1;
    color: #ff3b30;
  }
`

const CloseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color .1s;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  svg {
    width: 22px;
    height: 22px;
    color: #000;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 3;
    padding: 0;

    svg {
      width: 22px;
      height: 22px;
      color: #1e88e5;
      stroke-width: 1.6;
    }
  }
`

const DesktopOnly = styled.span`
  display: contents;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const MobileOnly = styled.span`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: contents;
  }
`

export default Recipient

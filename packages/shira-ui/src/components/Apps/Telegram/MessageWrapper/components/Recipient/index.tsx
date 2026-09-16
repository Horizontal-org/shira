import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { CloseIcon } from '../../../../../Icons'
import PhoneIcon from '../../../../SMS/Header/assets/Call'
import MoreOptionsIcon from '../../../../SMS/Header/assets/More'
import SearchIcon from '../../../../Whatsapp/Icons/Search'
import BackArrow from '../../../../Whatsapp/Icons/BackArrow'
import StrangerPicture from '../../../../Whatsapp/StrangerPicture'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
  showNotice?: boolean;
  onCloseNotice?: () => void;
}

const Recipient: FunctionComponent<Props> = ({ phone, showNotice, onCloseNotice }) => {
  const { t } = useTranslation('shira-ui')

  const initialMatch = (phone?.textContent || '').match(/[A-Za-z]/)
  const initial = initialMatch ? initialMatch[0].toUpperCase() : null

  return (
    <Wrapper>
      <Header>
        <BackArrowWrapper>
          <BackArrow />
        </BackArrowWrapper>

        <AvatarWrapper>
          {initial ? <Avatar>{initial}</Avatar> : <StrangerPicture />}
        </AvatarWrapper>

        <NamePill>
          <ContactInfo>
            <Name data-explanation={phone?.explanationPosition}>
              {phone?.textContent || ''}
            </Name>
            <LastSeen>{t('telegram.last_seen')}</LastSeen>
          </ContactInfo>
        </NamePill>

        <Icons>
          <IconWrapper>
            <PhoneIcon />
          </IconWrapper>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>
          <IconWrapper>
            <MoreOptionsIcon />
          </IconWrapper>
        </Icons>
      </Header>

      {showNotice && phone?.textContent && (
        <NoticeActions>
          <AddContact>{t('telegram.add_contact')}</AddContact>
          <BlockUser>{t('telegram.block_user')}</BlockUser>
          <CloseWrapper onClick={onCloseNotice}>
            <CloseIcon />
          </CloseWrapper>
        </NoticeActions>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }
`

const Header = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 8px 10px 0;
    gap: 8px;
  }
`

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-inline-end: 12px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 3;
    margin-inline-end: 0;
  }
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4FC3E8;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`

const NamePill = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  flex-grow: 1;
  padding: 8px 16px;
  border-radius: 20px;
  background: #f0f2f5;
  margin-inline-end: 12px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 2;
    margin-inline-end: 0;
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.14);
  }
`

const ContactInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #4FC3E8;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    color: #000;
  }
`

const LastSeen = styled.span`
  font-size: 12px;
  color: #8e8e93;
`

const Icons = styled.div`
  display: flex;
  margin-inline-start: auto;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const IconWrapper = styled.div`
  margin: 0 4px;
  padding: 8px;
  cursor: pointer;
  transition: background-color .1s;
  border-radius: 12px;
  background: #f0f2f5;

  > svg {
    display: block;
    width: 20px;
    height: 20px;
  }

  > svg path {
    fill: #707579;
  }

  &:active {
    background: rgba(11,20,26,0.1);
  }
`

const BackArrowWrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.14);

    > svg {
      width: 18px;
      height: 18px;
    }

    > svg path {
      fill: #707579;
    }
  }
`

const NoticeActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 16px 20px;
  padding: 10px 20px;
  font-size: 13px;
  border-radius: 20px;
  background: #f0f2f5;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin: 4px 10px 0;
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.14);
  }
`

const AddContact = styled.span`
  color: #222;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 2;
    color: #039BE5;
  }
`

const BlockUser = styled.span`
  color: #e53935;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    order: 1;
  }
`

const CloseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  svg path {
    fill: #8e8e93;
  }
`

export default Recipient

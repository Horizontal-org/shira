import { FunctionComponent } from 'react';
import { FiArrowLeft, FiBell, FiChevronRight, FiDownload, FiImage, FiLock, FiPhone, FiSearch, FiVideo } from 'react-icons/fi';
import { MdPalette } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import StrangerPicture from '../StrangerPicture';

interface Props {
  phone?: string
  onBack: () => void
}

const ContactInfo: FunctionComponent<Props> = ({ phone, onBack }) => {
  const { t } = useTranslation('shira-ui');

  return (
    <Wrapper aria-label={t('whatsapp.contact_info')}>
      <TopBar>
        <BackButton type="button" onClick={onBack} aria-label={t('whatsapp.back_to_chat')}><FiArrowLeft /></BackButton>
        <Title>{t('whatsapp.contact_info')}</Title>
      </TopBar>

      <Details>
        <Avatar><StrangerPicture /></Avatar>
        <ContactName>{t('whatsapp.contact')}</ContactName>
        <PhoneNumber>{phone || t('whatsapp.no_phone_number')}</PhoneNumber>

        <Actions aria-label={t('whatsapp.contact_actions')}>
          <Action type="button"><FiPhone /><span>{t('whatsapp.voice')}</span></Action>
          <Action type="button"><FiVideo /><span>{t('whatsapp.video')}</span></Action>
          <Action type="button"><FiSearch /><span>{t('whatsapp.search')}</span></Action>
        </Actions>

        <Settings>
          <Setting><FiBell /><span>{t('whatsapp.mute_notifications')}</span><Value>{t('whatsapp.off')}</Value><FiChevronRight /></Setting>
          <Setting><MdPalette /><span>{t('whatsapp.chat_theme')}</span><FiChevronRight /></Setting>
          <Setting><FiDownload /><span>{t('whatsapp.save_to_downloads')}</span><Value>{t('whatsapp.off')}</Value><FiChevronRight /></Setting>
        </Settings>

        <InfoRow><FiImage /><span>{t('whatsapp.media_links_and_docs')}</span><FiChevronRight /></InfoRow>
        <Privacy><FiLock /><span>{t('whatsapp.encryption_notice')}</span></Privacy>
      </Details>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  flex: 70%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  color: #111b21;
`

const TopBar = styled.header`
  height: 60px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  background: #f0f2f5;
  border-bottom: 1px solid #e1e4e6;
`

const BackButton = styled.button`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #54656f;
  cursor: pointer;
  font-size: 22px;

  &:hover { background: rgba(11, 20, 26, .08); }
  &:focus-visible { outline: 2px solid #00a884; }
`

const Title = styled.h2`
  margin: 0 0 0 14px;
  font-size: 16px;
  font-weight: 600;
`

const Details = styled.div`
  width: min(100%, 640px);
  margin: 0 auto;
  padding: 44px 36px;
  box-sizing: border-box;
  overflow-y: auto;
  text-align: center;
`

const Avatar = styled.div`
  display: inline-flex;
  padding: 3px;
  border: 2px solid #25d366;
  border-radius: 50%;

  > div, > div > svg { width: 86px; height: 86px; }
`

const ContactName = styled.h1`
  margin: 16px 0 4px;
  font-size: 24px;
  font-weight: 600;
`

const PhoneNumber = styled.p`
  margin: 0;
  color: #667781;
  font-size: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 36px 0 28px;
`

const Action = styled.button`
  min-height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 10px;
  background: #fff;
  color: #111b21;
  font: inherit;
  cursor: pointer;

  > svg { color: #00a884; font-size: 27px; stroke-width: 2; }
  &:hover { background: #f8f9fa; }
  &:focus-visible { outline: 2px solid #00a884; }
`

const Settings = styled.div`
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  text-align: left;
`

const Setting = styled.div`
  min-height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 18px;
  border-bottom: 1px solid #e9edef;
  font-size: 16px;

  &:last-child { border-bottom: 0; }
  > svg { color: #54656f; font-size: 22px; }
  > svg:last-child { margin-left: 0; color: #8696a0; font-size: 19px; }
`

const Value = styled.span`
  margin-left: auto;
  color: #667781;
`

const InfoRow = styled.div`
  min-height: 64px;
  margin-top: 18px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 18px;
  border-radius: 10px;
  background: #fff;
  text-align: left;
  font-size: 16px;

  > svg { color: #54656f; font-size: 22px; }
  > svg:last-child { margin-left: auto; color: #8696a0; font-size: 19px; }
`

const Privacy = styled.p`
  margin: 24px 8px 0;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #667781;
  font-size: 13px;
  line-height: 1.45;
  text-align: left;

  > svg { flex: none; margin-top: 2px; color: #00a884; }
`

export default ContactInfo

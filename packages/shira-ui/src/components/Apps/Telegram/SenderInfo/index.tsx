import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { FiFile, FiHeadphones, FiPhone, FiX } from 'react-icons/fi'
import StrangerPicture from '../../Whatsapp/StrangerPicture'

interface Props {
  phone: { textContent: string; explanationPosition: string }
  content?: HTMLElement
  onClose: () => void
}

const tabs = ['Media', 'Links', 'Voice'] as const
type Tab = typeof tabs[number]

export default function SenderInfo({ phone, content, onClose }: Props) {
  const { t } = useTranslation('shira-ui')
  const [tab, setTab] = useState<Tab>('Media')
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeButton.current?.focus()
    return () => { if (previousFocus?.isConnected) previousFocus.focus() }
  }, [])

  const images = Array.from(content?.querySelectorAll<HTMLImageElement>('[id*="component-image"]') || [])
  const links = Array.from(content?.querySelectorAll<HTMLAnchorElement>('a[href]') || [])
    .filter(link => /^(https?:|mailto:|tel:)/i.test(link.getAttribute('href') || ''))
  const attachments = Array.from(content?.querySelectorAll('[id*="component-attachment"]') || [])
    .filter(item => (item.getAttribute('data-attachment-type') === 'audio') === (tab === 'Voice'))

  return (
    <Panel aria-label={t('telegram.sender_info.title')} onKeyDown={event => {
      if (event.key === 'Escape') { event.stopPropagation(); onClose() }
    }}>
      <Header>
        <CloseButton ref={closeButton} type="button" aria-label={t('telegram.sender_info.close')} onClick={onClose}><FiX size={24} /></CloseButton>
        <Title>{t('telegram.sender_info.title')}</Title>
      </Header>
      <Body>
        <Profile>
          <Avatar><StrangerPicture /></Avatar>
          <Name>{phone.textContent || t('telegram.sender_info.unknown_user')}</Name>
          <Muted>{t('telegram.sender_info.last_seen')}</Muted>
        </Profile>
        {phone.textContent && <Details>
          <PhoneIcon><FiPhone size={22} /></PhoneIcon>
          <div><Value>{phone.textContent}</Value><Muted>{t('telegram.sender_info.phone')}</Muted></div>
        </Details>}
        <Tabs aria-label={t('telegram.sender_info.shared_content')}>
          {tabs.map(item => <TabButton key={item} type="button" $active={tab === item} aria-pressed={tab === item} onClick={() => setTab(item)}>{t(`telegram.sender_info.${item.toLowerCase()}`)}</TabButton>)}
        </Tabs>
        {tab === 'Links' ? (
          links.length ? links.map((link, index) => <Link key={index} href={link.getAttribute('href')!} target="_blank" rel="noopener noreferrer">{link.textContent || link.getAttribute('href')}</Link>) : <Empty>{t('telegram.sender_info.no_links')}</Empty>
        ) : <>
          {tab === 'Media' && images.length > 0 && <Grid>{images.map((img, index) => <img key={index} src={img.getAttribute('src') || undefined} alt={img.getAttribute('alt') || t('telegram.sender_info.shared_image')} />)}</Grid>}
          {attachments.map((item, index) => <File key={index}>{tab === 'Voice' ? <FiHeadphones size={22} /> : <FiFile size={22} />}<Value>{item.textContent}</Value></File>)}
          {!attachments.length && (tab !== 'Media' || !images.length) && <Empty>{tab === 'Media' ? t('telegram.sender_info.no_media') : t('telegram.sender_info.no_voice')}</Empty>}
        </>}
      </Body>
    </Panel>
  )
}

const Panel = styled.aside`
  width: 320px;
  max-width: 100%;
  flex-shrink: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #222;
  border-left: 1px solid #e2e2e2;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    box-shadow: -4px 0 16px rgba(0, 0, 0, .12);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`

const CloseButton = styled.button`
  display: flex;
  padding: 4px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #707579;
  cursor: pointer;

  &:hover {
    background: #f1f3f5;
  }
`

const Body = styled.div`
  overflow-y: auto;
  min-height: 0;
  padding: 24px 16px;
`

const Profile = styled.div`
  text-align: center;
  margin-bottom: 28px;
`

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 20px;

  > div,
  > div > svg {
    width: 120px;
    height: 120px;
  }
`

const Name = styled.h3`
  font-size: 22px;
  margin: 0 0 6px;
  overflow-wrap: anywhere;
`

const Muted = styled.div`
  color: #707579;
  font-size: 14px;
  margin-top: 4px;
`

const Details = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px 16px;
  border-radius: 20px;
  background: #f4f5f6;
  margin-bottom: 24px;

  > div {
    min-width: 0;
  }
`

const PhoneIcon = styled.span`
  display: flex;
  padding: 8px;
  border-radius: 12px;
  background: #64c566;
  color: white;
`

const Value = styled.div`
  font-size: 15px;
  overflow-wrap: anywhere;
`

const Tabs = styled.div`
  display: flex;
  border-radius: 24px;
  background: #f4f5f6;
  padding: 4px;
  margin-bottom: 16px;
`

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border: 0;
  padding: 12px 4px;
  border-radius: 20px;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${props => props.$active ? '#039BE5' : '#707579'};
  background: ${props => props.$active ? '#e3f2fd' : 'transparent'};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 3px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`

const File = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;

  svg {
    flex-shrink: 0;
    color: #039BE5;
  }
`

const Link = styled.a`
  display: block;
  padding: 12px 0;
  color: #039BE5;
  overflow-wrap: anywhere;
`

const Empty = styled.p`
  text-align: center;
  color: #707579;
  font-size: 14px;
  padding: 24px 0;
`

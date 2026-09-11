import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { MdOutlineFileDownload } from 'react-icons/md'
import SaferWithGoogleLogo from './assets/safer-with-google.png'
import { Attachment } from '../Attachment';
import { AttachmentElement } from '..';
import AddToDriveIcon from '../Attachment/components/AddToDriveIcon'

interface Props {
  data: AttachmentElement[],
}

export const Attachments: FunctionComponent<Props> = ({
  data,
}) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <HeaderRow>
        <Title>{t('gmail.attachments', { count: data.length })}</Title>
        <Point>•</Point>
        <ScannedRow>
          <Subtitle>{t('gmail.scanned_by_gmail')}</Subtitle>
          <TooltipTrigger>
            <InfoButton
              type="button"
              aria-label={t('gmail.attachment_scanning_title')}
            >
              <IoMdInformationCircleOutline size={16} />
            </InfoButton>
            <TooltipCard data-gmail-attachment-tooltip="card" role="tooltip">
              <TooltipTitle>{t('gmail.attachment_scanning_title')}</TooltipTitle>
              <TooltipDescription>
                {t('gmail.attachment_scanning_description')}{' '}
                <LearnMoreText
                  href={'https://support.google.com/mail/answer/25760?hl=en'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => {
                    event.preventDefault()
                  }}
                  onContextMenu={(event) => {
                    event.preventDefault()
                  }}
                >
                  {t('gmail.learn_more')}
                </LearnMoreText>
              </TooltipDescription>
              <TooltipFooter>
                <SaferWithGoogleImage
                  src={SaferWithGoogleLogo}
                  alt={t('gmail.safer_with_google')}
                />
              </TooltipFooter>
            </TooltipCard>
          </TooltipTrigger>
          {data.length > 1 && (
            <>
              <DownloadIconButton
                type="button"
              >
                <MdOutlineFileDownload size={20} aria-hidden="true" />
              </DownloadIconButton>
              <DriveActionButton
                type="button"
              >
                <GoogleDriveAddIcon>
                  <AddToDriveIcon />
                </GoogleDriveAddIcon>
                <DriveActionText>{t('gmail.add_all_to_drive')}</DriveActionText>
              </DriveActionButton>
            </>
          )}
          {data.length === 1 && (
            <DriveActionButton
              type="button"
            >
              <GoogleDriveAddIcon>
                <AddToDriveIcon />
              </GoogleDriveAddIcon>
              <DriveActionText>{t('gmail.add_to_drive')}</DriveActionText>
            </DriveActionButton>
          )}
        </ScannedRow>
      </HeaderRow>
      <AttachmentWrapper>
        {data.sort((a, b) => parseInt(a.position) - parseInt(b.position)).map((d) => (
          <Attachment
            key={d.name + d.position}
            name={d.name}
            position={d.position}
            explanationPosition={d.explanationPosition}
            type={d.fileType}
          />
        ))}
      </AttachmentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 8px;
  width: 100%;
  border-top: 1px dotted #d8d8d8;
  overflow: visible;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const Title = styled.div`
  display: inline-flex;
  font-size: .875rem;
  height: 20px;
  line-height: 20px;
  font-weight: bold;
`

const Point = styled.div`
  display: inline-flex;
  padding: 0 6px;
`

const ScannedRow = styled.div`
  display: inline-flex;
  align-items: center;
`

const Subtitle = styled.div`
  display: inline-flex;
  font-size: .875rem;
  height: 20px;
  line-height: 20px;
  font-weight: 400;
`

const TooltipTrigger = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-inline-start: 3px;

  &:hover [data-gmail-attachment-tooltip='card'],
  &:focus-within [data-gmail-attachment-tooltip='card'] {
    opacity: 1;
    visibility: visible;
  }
`

const InfoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #5f6368;
  cursor: default;

  > svg {
    display: block;
  }
`

const DownloadIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  margin-inline-start: 16px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #444746;
  cursor: pointer;

  &:hover {
    background: rgba(60,64,67,.1);
  }

  &:active {
    background: rgba(60,64,67,.12);
  }

  > svg {
    display: block;
  }
`

const DriveActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  height: 28px;
  margin-inline-start: 16px;
  padding: 0 16px;
  border: 0;
  border-radius: 16px;
  background: transparent;
  color: #444746;
  cursor: pointer;

  &:hover {
    background: #e8f0fe;
  }

  &:active {
    background: #d2e3fc;
  }
`

const GoogleDriveAddIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
  fill: currentColor;
`

const DriveActionText = styled.span`
  margin-inline-start: 8px;
  font-size: 0.900rem;
  line-height: 20px;
`

const TooltipCard = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  inset-inline-start: -24px;
  width: 328px;
  max-width: min(360px, calc(100vw - 48px));
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);
  color: #3c4043;
  visibility: hidden;
  opacity: 0;
  z-index: 5;

  &::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    inset-inline-end: 0;
    bottom: 100%;
    height: 12px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    inset-inline-start: auto;
    inset-inline-end: -8px;
  }
`

const TooltipTitle = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: #202124;
`

const TooltipDescription = styled.div`
  margin-top: 8px;
  font-size: .875rem;
  line-height: 1.5rem;
  color: #3c4043;
`

const LearnMoreText = styled.a`
  color: #1a73e8;
  text-decoration: underline;
`

const TooltipFooter = styled.div`
  margin-top: 18px;
`

const SaferWithGoogleImage = styled.img`
  display: block;
  height: 24px;
`

const AttachmentWrapper = styled.div`
  display: flex;
  padding-top: 12px;
  flex-wrap: wrap;

  > div {
    margin-bottom: 18px;
    margin-inline-end: 8px;
  }
`

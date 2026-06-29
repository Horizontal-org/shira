import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import SaferWithGoogleLockup from './assets/safer-with-google.png'
import { Attachment } from '../Attachment';
import { AttachmentElement } from '..';

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
                  src={SaferWithGoogleLockup}
                  alt={t('gmail.safer_with_google')}
                />
              </TooltipFooter>
            </TooltipCard>
          </TooltipTrigger>
        </ScannedRow>
      </HeaderRow>
      <AttachmentWrapper>
        { data.sort((a, b) => parseInt(a.position) - parseInt(b.position)).map((d) => (
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
  letter-spacing: normal;
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
  letter-spacing: normal;
  height: 20px;
  line-height: 20px;
  font-weight: 400;
`

const TooltipTrigger = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-left: 3px;

  &:hover [data-gmail-attachment-tooltip='card'],
  &:focus-within [data-gmail-attachment-tooltip='card'] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
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

const TooltipCard = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  left: -24px;
  width: 360px;
  max-width: min(360px, calc(100vw - 48px));
  padding: 18px 16px 14px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.15), 0 2px 6px 2px rgba(60, 64, 67, 0.15);
  color: #3c4043;
  visibility: hidden;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s ease;
  z-index: 5;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    height: 12px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    left: auto;
    right: -8px;
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
  display: inline-flex;
  align-items: center;
  margin-top: 18px;
`

const SaferWithGoogleImage = styled.img`
  display: block;
  height: 24px;
  width: auto;
`

const AttachmentWrapper = styled.div`
  display: flex;
  padding-top: 12px;
  flex-wrap: wrap;

  > div {
    margin-bottom: 18px;
    margin-right: 8px;
  }
`

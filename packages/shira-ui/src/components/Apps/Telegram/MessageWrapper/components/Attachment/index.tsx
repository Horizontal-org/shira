import { FunctionComponent } from "react";
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { AudioIcon, PdfIcon, GenericAttachmentIcon } from '../../../../../Icons'
import { AttachmentType } from '../../../../../Attachments'
import DownloadIcon from '../../../../Whatsapp/Icons/Download'

interface Props {
  name: string,
  type?: string,
  explanationPosition?: string
}

const renderIcon = (type?: string) => {
  switch (type) {
    case AttachmentType.audio:
      return <AudioIcon />
    case AttachmentType.document:
      return <PdfIcon />
    default:
      return <GenericAttachmentIcon />
  }
}

export const Attachment: FunctionComponent<Props> = ({ name, type, explanationPosition }) => {
  const isAudio = type === AttachmentType.audio
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Card data-explanation={explanationPosition}>
        <div>
          <IconWrapper>
            {renderIcon(type)}
          </IconWrapper>
          <Info>
            <Name>{name}</Name>
            {isAudio ? (
              <Duration>00:02</Duration>
            ) : (
              <DownloadLabel>{t('telegram.download')}</DownloadLabel>
            )}
          </Info>
          {!isAudio && (
            <Download>
              <DownloadIcon />
            </Download>
          )}
        </div>
        <span>00:00</span>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #039BE5;
  margin-inline-end: 10px;

  > svg {
    width: 18px;
    height: 18px;
  }

  svg path {
    fill: #fff;
  }
`

const Download = styled.div`
  display: flex;
  align-items: center;
  margin-inline-start: 8px;

  > svg {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    fill: rgba(84,101,111, 0.5);
  }
`

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  border-top-inline-start-radius: 4px;
  padding-top: 6px;
  padding-inline-end: 7px;
  padding-bottom: 8px;
  padding-inline-start: 9px;
  box-shadow: 0 1px 0.5px rgba(11,20,26, .13);

  > div {
    cursor: pointer;
    background: #f5f6f6;
    border-radius: 10px;
    padding: 8px;
    display: flex;
    align-items: center;
  }

  > span {
    font-size: 9px;
    color: #8e8e93;
    display: block;
    text-align: end;
    padding-top: 2px;
    font-weight: 400;
    margin-bottom: -2px;
  }
`

const Info = styled.div`
  min-width: 0;
  flex-grow: 1;
`

const Name = styled.div`
  text-align: start;
  font-size: 12px;
  color: #111b21;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DownloadLabel = styled.span`
  font-size: 11px;
  color: #039BE5;
`

const Duration = styled.span`
  font-size: 11px;
  color: #667781;
`

export default Attachment

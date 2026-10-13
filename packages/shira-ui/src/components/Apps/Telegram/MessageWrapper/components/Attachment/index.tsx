import { FunctionComponent } from "react";
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { LuArrowDown, LuPlay } from 'react-icons/lu'
import { MdInsertDriveFile } from 'react-icons/md'
import { AttachmentType } from '../../../../../Attachments'

interface Props {
  name: string,
  type?: string,
  explanationPosition?: string
}

export const Attachment: FunctionComponent<Props> = ({ name, type, explanationPosition }) => {
  const isAudio = type === AttachmentType.audio
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Card data-explanation={explanationPosition}>
        <div>
          <DesktopIcon>
            {isAudio ? <LuPlay /> : <LuArrowDown />}
          </DesktopIcon>
          <IconWrapper>
            {isAudio ? <LuPlay /> : <MdInsertDriveFile />}
          </IconWrapper>
          <Info>
            <Name>{name}</Name>
            {isAudio ? (
              <Duration>{t('telegram.voice_duration')}</Duration>
            ) : (
              <>
                <DownloadLabel>{t('telegram.download')}</DownloadLabel>
                <Size>{t('telegram.file_size')}</Size>
              </>
            )}
          </Info>
        </div>
        <span>{t('telegram.time')}</span>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 70%;
  display: flex;
  flex-grow: 1;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
    width: fit-content;
    max-width: 80%;
    box-sizing: border-box;
    background: #fff;
    border-radius: 18px;
    padding: 8px 12px 6px 8px;
  }
`

const DesktopIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #3390ec;
  margin-inline-end: 14px;

  > svg {
    width: 24px;
    height: 24px;
    color: #fff;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const IconWrapper = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #2f8fe8;
  margin-inline-end: 10px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: flex;
  }

  > svg {
    width: 22px;
    height: 22px;
    color: #fff;
  }
`

const Card = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    min-width: 0;
  }

  > span {
    flex-shrink: 0;
    font-size: 13px;
    color: #8e8e93;
    font-weight: 400;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;

    > span {
      display: block;
      margin-top: -2px;
      font-size: 12px;
      line-height: 1;
      text-align: end;
      color: #a0a0a5;
    }
  }
`

const Info = styled.div`
  min-width: 0;
  flex-grow: 1;
`

const Name = styled.div`
  text-align: start;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  margin-bottom: 2px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-weight: 400;
    color: #2f8fe8;
    margin-bottom: 0;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DownloadLabel = styled.span`
  display: block;
  text-align: start;
  font-size: 16px;
  color: #2481cc;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const Size = styled.span`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
    text-align: start;
    font-size: 14px;
    color: #8e8e93;
  }
`

const Duration = styled.span`
  display: block;
  text-align: start;
  font-size: 15px;
  color: #8e8e93;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 14px;
  }
`

export default Attachment

import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfilePicture from '../../../../Whatsapp/ProfilePicture'

const FILLER_STORIES = [1]

interface Props { }

const Stories: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <StoryItem>
        <ProfilePicture imageSize="78px" />
        <Label muted>{t('instagram.your_note')}</Label>
      </StoryItem>

      {FILLER_STORIES.map((contact) => (
        <StoryItem key={contact}>
          <ProfilePicture imageSize="78px" />
          <Label>{t(`whatsapp.contact_${contact}_name`)}</Label>
        </StoryItem>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  gap: 16px;
  padding: 12px 24px 16px;
  overflow-x: auto;
`

const StoryItem = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 96px;
`

const Label = styled.span<{ muted?: boolean }>`
  font-size: 12px;
  color: ${props => props.muted ? '#737373' : '#000'};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 96px;
`

export default Stories

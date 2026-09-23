import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfilePicture from '../../../../Whatsapp/ProfilePicture'

const FILLER_STORIES = [1, 2]

interface Props { }

const Stories: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <StoryItem>
        <PictureWrapper>
          <ProfilePicture imageSize="56px" />
        </PictureWrapper>
        <Label>{t('instagram.your_note')}</Label>
      </StoryItem>

      {FILLER_STORIES.map((contact) => (
        <StoryItem key={contact}>
          <Ring>
            <PictureWrapper>
              <ProfilePicture imageSize="56px" />
            </PictureWrapper>
          </Ring>
          <Label>{t(`whatsapp.contact_${contact}_name`)}</Label>
        </StoryItem>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 16px 16px;
  overflow-x: auto;
`

const StoryItem = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 64px;
`

const Ring = styled.div`
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7);
`

const PictureWrapper = styled.div`
  border-radius: 50%;
  border: 2px solid #fff;
  overflow: hidden;
`

const Label = styled.span`
  font-size: 12px;
  color: #262626;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 64px;
`

export default Stories

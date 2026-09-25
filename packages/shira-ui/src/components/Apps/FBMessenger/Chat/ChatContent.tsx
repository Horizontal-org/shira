import { FunctionComponent } from "react"
import styled from 'styled-components'
import ProfilePicture from "../../Whatsapp/ProfilePicture"
import DocumentIcon from './assets/document.png'
import AudioWave from './assets/AudioWave.tsx'
import AudioPlayIcon from './assets/AudioPlayIcon.tsx'
import { MessagingImage } from "./MessagingImage"
interface Props {
  content: Element[]
}

const isAudioType = (filename: string) => {
    return filename.endsWith("mp3") || filename.endsWith("ogg")
}

const apparentlyRandomSize = (name: string) => name.length + 500

const ChatContent: FunctionComponent<Props> = ({
  content,
}) => {
  return (
    <Wrapper>
      <MessageWrapper>
        <div><ProfilePicture imageSize='28px' /></div>
        <TextWrapper>
          {content.map(c => (
            <>
              {c.getAttribute('id').includes('component-text') && (
                <Text dangerouslySetInnerHTML={{ __html: c.outerHTML }} />
              )}

              {c.getAttribute('id').includes('component-image') && (
                <MessagingImage data={c} />
              )}

              {c.getAttribute('id').includes('component-attachment') && (
                  <>
                  {isAudioType(c.textContent) ? 
                    <AudioAttachment>
                        <AudioPlayIcon/>
                        <AudioWave/>
                        <span>1:37</span>
                    </AudioAttachment>
                    :
                <Attachment>
                  <IconWrapper>
                    <Icon icon={DocumentIcon} size='28'></Icon>
                  </IconWrapper>

                  <AttachmentText>
                    <Heading>
                      <span
                        data-explanation={c.getAttribute('data-explanation')}
                      >
                        {c.textContent}
                      </span>
                    </Heading>

                    <SecondaryText>{apparentlyRandomSize(c.textContent)} kB</SecondaryText>
                  </AttachmentText>
                </Attachment>
                  }
                </>
              )}
            </>
          ))}
        </TextWrapper>
      </MessageWrapper>
      <MessageDate>
        14/12/20 10:58
      </MessageDate>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  flex-grow: 1;

  padding: 8px;

  overflow-y: scroll;
`

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: .9375rem;
`

const MessageDate = styled.div`
  text-align: center;

  color: #65676B;
  font-size: .8125rem;
  font-weight: light;
  padding: 16px 0;
`

const TextWrapper = styled.div`
  max-width: 500px;

  display: flex;
  flex-direction: column;
`

const Text = styled.div`
  overflow-wrap: break-word;
  word-break: break-word; 

  margin-inline-start: 8px;
  padding: 8px 12px;
  margin-top: 8px;
  
  background: rgba(60,64,67,.1);
  border-radius: 16px;

  flex-shrink: 1;
  color: #050505;
  p, h2 {
    margin: 0px;
    font-size: .9375rem;
    line-height: 20px;
  }
`

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;

  background: rgba(60,64,67,.05);
  &:hover {
    background: rgba(60,64,67,.12);
  }


  display: flex;
  align-items: center;
  justify-content: center;
`
interface IconProps {
  icon: string;
  size: string;
}

const Icon = styled('div') <IconProps>`
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  opacity: .71;
`

const Attachment = styled(Text)`
  display: flex;
  width: max-content;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
  align-items: center;
`
const AudioAttachment = styled.div`
  display: flex;
  height: 5rem;
  gap: 1rem;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 10rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: bold;
  border-radius: 16px;
  background: rgba(60,64,67,.1);
  align-items: center;
`

const SecondaryText = styled.div`
  color: #65676B;
  font-size: .8125rem;
  font-weight: light;
`

const Heading = styled.div`
  font-weight: bold;
  span {
    position: relative;
  }
`

const AttachmentText = styled.div`
  margin-inline-start: 8px;
`

export default ChatContent

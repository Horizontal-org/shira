import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Picture from './components/Picture'

interface ImageWrapperProps {
  imageSize?: string
}

const ProfilePicture:FunctionComponent<ImageWrapperProps> = ({
  imageSize
}) => {
  return (
    <ImageWrapper 
      imageSize={imageSize}
    >
     <Picture />
    </ImageWrapper>
  )
}

const ImageWrapper = styled('div')<ImageWrapperProps>`
  width: ${(props) => props.imageSize};
  height: ${(props) => props.imageSize};
  border-radius: 50%;
  overflow: hidden;

  > svg {
    width: ${(props) => props.imageSize};
    height: ${(props) => props.imageSize};
  }
`

ProfilePicture.defaultProps = {
  imageSize: '40px',
}

export default ProfilePicture
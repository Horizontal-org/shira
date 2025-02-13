import { FunctionComponent } from 'react'
import { styled } from '@shira/ui'

import Stranger from '../Icons/Stranger'

interface ImageWrapperProps {
}

const StrangerPicture:FunctionComponent<ImageWrapperProps> = () => {
  return (
    <ImageWrapper 
    >
     <Stranger />
    </ImageWrapper>
  )
}

const ImageWrapper = styled('div')<ImageWrapperProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  > svg {
    width: 40px;
    height: 40px;
  }
`

StrangerPicture.defaultProps = {
  imageSize: '40px',
}

export default StrangerPicture
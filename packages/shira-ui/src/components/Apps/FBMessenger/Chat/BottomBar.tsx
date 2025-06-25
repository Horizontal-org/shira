import { FunctionComponent  } from "react"
import styled from 'styled-components'
import RecorderIcon from "./RecorderIcon"

import MoreIcon from './assets/more.png'
import FileIcon from './assets/file.png'
import StickerIcon from './assets/sticker.png'
import GifIcon from './assets/gif.png'
import LikeIcon from './assets/like.png'
import EmojiIcon from './assets/emoji.png'
import MenuIcon from './assets/menu.png'
import CameraIcon from './assets/camera.png'
import ImageIcon from './assets/image.png'
import useGetWidth from "../../hooks/useGetWidth"

const BottomBar: FunctionComponent = () => {
  const { width } = useGetWidth()

  return (
      <Wrapper>
        <FlexWrapper>
          { width > 490 && (
            <>
              <IconWrapper>
                <Icon icon={MoreIcon} size='28'/>
              </IconWrapper>
              <IconWrapper>
                <Icon icon={FileIcon} size='28'/>
              </IconWrapper>
              <IconWrapper>
                <Icon icon={StickerIcon} size='28'/>
              </IconWrapper>
              <IconWrapper>
                <Icon icon={GifIcon} size='28'/>
              </IconWrapper>
            </>
          )}

          { width < 490 && (
            <>
              <IconWrapper>
                <Icon icon={MenuIcon} size='20'/>
              </IconWrapper>

              <IconWrapper>
                <Icon icon={CameraIcon} size='20'/>
              </IconWrapper>

              <IconWrapper>
                <Icon icon={ImageIcon} size='20'/>
              </IconWrapper>

              <IconWrapper>
                <RecorderIcon />
              </IconWrapper>
            </>
          )}
        </FlexWrapper>
        <KeywordBar>
          <Text>Aa</Text>

          <IconWrapper>
            <Icon icon={EmojiIcon} size='28'/>
          </IconWrapper>
        </KeywordBar>
        <IconWrapper>
          <Icon icon={LikeIcon} size='20'/>
        </IconWrapper>
      </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 98%;
  padding: 8px;
`

const FlexWrapper = styled.div`
  display: flex;
`
const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(60,64,67,.1);
  }


  display: flex;
  align-items: center;
  justify-content: center;
`
interface IconProps {
  icon: string;
  size: string
}

const Icon = styled('div')<IconProps>`
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
`


const KeywordBar = styled.div`
  flex-grow: 1;
  border-radius: 24px;
  background: rgba(60,64,67,.05);

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 8px;
`

const Text = styled.div`
  padding-left: 16px;
  color: rgba(60,64,67,.5);
`
export default BottomBar
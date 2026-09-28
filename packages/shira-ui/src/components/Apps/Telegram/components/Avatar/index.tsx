import { FunctionComponent } from 'react'
import styled from 'styled-components'
import StrangerPicture from '../../../Whatsapp/StrangerPicture'

interface Props {
  name?: string;
  size: number;
}

const Avatar: FunctionComponent<Props> = ({ name, size }) => {
  const initialMatch = (name || '').match(/[A-Za-z]/)
  const initial = initialMatch ? initialMatch[0].toUpperCase() : null

  return (
    <Wrapper $size={size}>
      {initial ? <Initial>{initial}</Initial> : <StrangerPicture />}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  font-size: ${props => Math.round(props.$size * 0.42)}px;

  > div, > div > svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const Initial = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #6fe5c5 0%, #27c2a4 100%);
  color: #fff;
  font-weight: 600;
`

export default Avatar

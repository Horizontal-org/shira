import { FunctionComponent } from 'react'
import styled from 'styled-components'
import Forward from '../../../Icons/Forward'
import Scissors from '../../../Icons/Scissors'

interface Props {
  data: Element
}

export const MessagingImage: FunctionComponent<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Content dangerouslySetInnerHTML={{ __html: data.outerHTML }}></Content>
      <Actions>
        <ActionIconWrapper>
          <Forward />
        </ActionIconWrapper>
        <ActionIconWrapper>
          <Scissors />
        </ActionIconWrapper>
      </Actions>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 85%;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    > div:last-child {
      opacity: 1;
    }
  }
`

const Content = styled.div`
  max-height: 300px;
  border-radius: 18px;
  overflow: hidden;

  img {
    display: block;
    max-width: 100%;
    max-height: 300px;
    min-width: 50px;
    min-height: 30px;
    object-fit: contain;
    height: 100%;
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: 0;
  transition: opacity .1s;
`

const ActionIconWrapper = styled.div`
  display: flex;
  cursor: pointer;

  > svg {
    width: 18px;
    height: 18px;
  }
`

export default MessagingImage

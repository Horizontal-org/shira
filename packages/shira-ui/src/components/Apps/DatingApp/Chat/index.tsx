import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Message } from './Message'
import { Attachment } from './Attachment'
interface Props {
    data: HTMLElement
  }

export const Chat: FunctionComponent<Props> = ({ data}) => {
  return (
    <Wrapper>
      <Date>14:58</Date>
      { Array.from(data.querySelectorAll('[id*="component-"]')).sort((a, b) => parseInt(b.getAttribute('data-position')) - parseInt(a.getAttribute('data-position'))).map((e) => (
        <>
          { e.getAttribute('id').includes('component-text') && (
            <Message data={e}/>
          )}

          { e.getAttribute('id').includes('component-attachment') && (
            <Attachment 
              explanationPosition={e.getAttribute('data-explanation') || null} 
              name={e.textContent}
            />
          )}
        </>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;  
  height: 100%;

  mark {
    background: transparent;
    position: relative;
  }
  overflow-y: scroll;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  padding-top: 8px;
`

const Date = styled.div`
  color: #9E9EA8;
  font-size: .7rem;
  padding:0 8px 16px 8px;
`
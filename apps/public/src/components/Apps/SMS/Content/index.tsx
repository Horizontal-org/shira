import { FunctionComponent, useEffect, useState } from 'react'
import { styled } from '@horizontal-org/shira-ui'
import { Attachment } from '../Attachment'
import { Message } from '../Message'

interface Props {
  data: HTMLElement
}

export const Content: FunctionComponent<Props> = ({ data }) => {
  return (
    <Wrapper>
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
  overflow-y: scroll;

  mark {
    background: transparent;
    position: relative;
  }

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
  
`
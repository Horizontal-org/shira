import { FunctionComponent } from "react";
import styled from 'styled-components'
import { MdDeleteOutline, MdOutlineDragIndicator } from 'react-icons/md'

interface Props {
  onDelete: () => void
  dragHandleProps: {}
  selected: boolean
}

export const ExplanationItemOptions: FunctionComponent<Props> = ({
  onDelete,
  dragHandleProps,
  selected
}) => {
  return (
    <Wrapper selected={selected}>
      <SvgWrapper onClick={onDelete}>
        <MdDeleteOutline
          size={20}
        />      
      </SvgWrapper>
      <SvgWrapper
        {...dragHandleProps}
      >
        <MdOutlineDragIndicator
          size={20}
        />      
      </SvgWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ selected: boolean }>`
padding: 2px 8px 0 0;
`
// visibility: ${props => props.selected ? 'visible' : 'hidden' };

const SvgWrapper = styled.div`
  cursor: pointer;
  
  > svg {
    fill: #aaa;
  }

  &:hover {
    > svg {
      fill: #ddd;
    } 
  }
`
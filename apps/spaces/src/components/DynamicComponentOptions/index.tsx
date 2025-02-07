import { FunctionComponent } from "react";
import styled from 'styled-components'
import { MdDeleteOutline, MdOutlineDragIndicator } from 'react-icons/md'

interface Props {
  onDelete: () => void
  dragHandleProps: {}
}

export const DynamicComponentOptions: FunctionComponent<Props> = ({
  onDelete,
  dragHandleProps
}) => {
  return (
    <Wrapper>
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

const Wrapper = styled.div`
  padding: 2px 8px 0 0;
`

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
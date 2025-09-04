import { FunctionComponent } from "react";
import styled from 'styled-components'
import { MdDeleteOutline, MdOutlineDragIndicator } from 'react-icons/md'

import Trash from '../../icons/Trash'
import Reorder from '../../icons/Reorder'

interface Props {
  onDelete: () => void
  dragHandleProps: {}
}

export const DragItemOptions: FunctionComponent<Props> = ({
  onDelete,
  dragHandleProps,
}) => {
  return (
    <Wrapper>
      <SvgWrapper
        {...dragHandleProps}
      >
        <Reorder/>
      </SvgWrapper>
      <SvgWrapper onClick={onDelete}>
        <Trash/>      
      </SvgWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const SvgWrapper = styled.div`
  cursor: pointer;

  > svg {
    > path {
      fill: #ACADAE
    }
  }

  &:hover {
    > svg {
      > path {
        fill: #ddd; 
      }
    } 
  }
`
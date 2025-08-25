import { FunctionComponent } from "react";
import styled from 'styled-components'
import { MdDeleteOutline, MdOutlineDragIndicator } from 'react-icons/md'

import Trash from '../../../../icons/Trash'
import Reorder from '../../../../icons/Reorder'

interface Props {
  onDelete: () => void
  dragHandleProps: {}
  typeOffset: string
}

export const QuestionContentDragItemOptions: FunctionComponent<Props> = ({
  onDelete,
  dragHandleProps,
  typeOffset = ''
}) => {
  return (
    <Wrapper $typeOffset={typeOffset}>
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

const Wrapper = styled.div<{
  $typeOffset: string
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 20px;
  padding-top: ${props => props.$typeOffset};
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
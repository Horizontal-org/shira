import { FunctionComponent } from "react";
import styled from 'styled-components'
import { format, subDays } from "date-fns";

interface Props {

}

import Reply from '../../icons/Reply'
import Forward from '../../icons/Forward'
import ReplyAll from '../../icons/ReplyAll'
import AppFolder from '../../icons/AppFolder'
import More from '../../icons/More'
import { RightActionsButton } from "./components/RightActionButton";

export const RightActions:FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <ButtonsWrapper>
        <RightActionsButton 
          icon={<Reply />}
        />
        <RightActionsButton 
          icon={<ReplyAll />}
        />
        <RightActionsButton 
          icon={<Forward />}
        />
        <RightActionsButton 
          icon={<AppFolder />}
          hasSeparator={true}      
        />
        <RightActionsButton 
          icon={<More />}
          hasSeparator={true}      
        />
      </ButtonsWrapper>
      <DateLabel>
        { format(subDays(new Date(), 3), 'E yyyy-MM-dd HH:mm') }
      </DateLabel>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
`

const DateLabel = styled.p`
  text-align: right;
  margin: 4px 0 0 0;
  font-size: 11px;
  font-weight: 400;
  color: #424242;
  padding: 2px 6px;
`
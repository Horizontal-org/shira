import { FunctionComponent } from 'react'
import { styled } from '@horizontal-org/shira-ui'
import Account from './assets/Account'

interface Props {

}

export const Pic: FunctionComponent<Props> = () => {
  return (
    <Wrapper>
      <Account />
    </Wrapper>
  )
}


const Wrapper = styled.div`
  align-self: felx-start;
  margin-bottom: -6px;
  margin-right: 6px;

  > svg {
    width: 25px;
    height: 25px;
    fill: ${props => props.theme.primary.base};
  }
`
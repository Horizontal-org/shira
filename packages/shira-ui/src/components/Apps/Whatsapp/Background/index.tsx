import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
}

const Background: FunctionComponent<Props> = ({ children }) => {
  return (
    <Wrapper>
      <HeadBrand />
      <ChildrenWrapper>
        { children }
      </ChildrenWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, #eae6df, #d1d7db);
  height: 100%;
`

const ChildrenWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  position: relative;
`

const HeadBrand = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  background: #00a884;
  width: 100%;
  height: 120px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`
export default Background
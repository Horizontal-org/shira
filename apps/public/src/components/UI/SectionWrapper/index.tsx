import { styled } from '@shira/ui'

export const SectionWrapper = styled.div<{ size?: string }>`
  z-index: 2;
  position: relative; 
  padding: 32px 24px;
  background: #fff;
  @media (min-width:  ${props => props.theme.breakpoints.xs}) {
    width: ${props => props.size === 'lg' ? '100vw' : '80vw'};
    padding: 48px;
    border-radius: 24px;
  }

  @media (min-width:  ${props => props.theme.breakpoints.md}) {
    width: ${props => props.size === 'lg' ? '80vw' : '50vw'};
  }
  @media (min-width:  ${props => props.theme.breakpoints.lg}) {
    width: ${props => props.size === 'lg' ? '60vw' : '40vw'};
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    max-height: calc(100vh - 116px); // height of all of the screen minus the footer and 30px of margin
    overflow-y: scroll;
  }
`

export const Wrapper = styled.div`
  @media (min-width:  ${props => props.theme.breakpoints.xs}) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
    margin-top: 20px;
  }
`
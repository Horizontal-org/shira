// import { styled } from '@shira/ui';
import { styled } from '@shira/ui'

export const SceneWrapper = styled.div<{ bg?: string }>`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  @media (min-width: ${props => props.theme.breakpoints.xs}) {
    background: ${props => props.bg === 'white' ? '#fff' : props.theme.colors.light.paleGreen};
  }
`
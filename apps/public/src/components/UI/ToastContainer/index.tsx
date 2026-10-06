import { styled } from '@horizontal-org/shira-ui'

export default props => (
  <Wrapper {...props} />
)

const Wrapper = styled.div`
  position: fixed;
  inset-inline-end: 0;
  top: 0;
`

import { styled } from '@horizontal-org/shira-ui'

export default styled.div`
  padding: 8px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin: 0 4px;

  > svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: rgba(60,64,67,.1);
  }

  &:active {
    background: rgba(60,64,67,.12);
  }
`
import styled from 'styled-components';

export interface TabProps {
  text: string;
  onClick: () => void
}

export const Tab = ({ text, onClick }: TabProps) => {
  return (
    <Wrapper onClick={onClick}>
      {text}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px 16px;
  color: ${props => props.theme.colors.green8};
  border: 1px solid ${props => props.theme.colors.green8};
  border-radius: 100px;
  cursor: pointer;
`


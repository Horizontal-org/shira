import { styled } from '@horizontal-org/shira-ui';

export const Title = styled.h2`
  margin-top: 0;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 700;
  font-size: 28px;
  line-height: 26px;

  @media (max-width:  ${props => props.theme.breakpoints.sm}) {
    font-size: 24px;
  }
`

export const Heading = styled(Title)`
  font-size: 60px;
  line-height: 81px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 48px;
    line-height: 65px;
  }
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 40px;
    line-height: 54px;
  }

`

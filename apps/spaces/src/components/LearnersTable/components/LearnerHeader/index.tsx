import { Body3, Body3Bold, styled } from "@shira/ui"

export const LearnerPersonInfo = styled.div`
  color: ${props => props.theme.colors.dark.darkGrey};
`

export const LearnerName = styled(Body3Bold)`
  margin: 0;
  font-weight: 700;
`

export const LearnerEmail = styled(Body3)`
  font-size: 14px;
`

export const LearnerHeader = styled.div`
  display: flex;
  align-items: center;
  > svg {
    margin-right: 8px; 
  }
`
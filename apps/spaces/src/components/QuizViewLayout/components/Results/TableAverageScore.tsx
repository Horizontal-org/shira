import { Body3, styled } from "@shira/ui";
import { FunctionComponent } from "react";

interface Props {
  averageScore: string;
}

export const TableAverageScore: FunctionComponent<Props> = ({
  averageScore
}) => {
  return (
    <Score>
      <StyledBody3>{averageScore}%</StyledBody3>
      <ScoreBar 
        score={parseInt(averageScore)}
      />
    </Score>
  )
}

const Score = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  color: ${props => props.theme.colors.dark.darkGrey};
`

const StyledBody3 = styled(Body3)`
  width: 40px;

`
const ScoreBar = styled.div<{ score: number }>`
  width: 200px;
  height: 4px;
  background-color: ${props => props.theme.colors.light.paleGreen};
  border-radius: 5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: ${props => props.score}%;
    background-color: ${props => props.theme.colors.green5};
    border-radius: 5px;
  }
`
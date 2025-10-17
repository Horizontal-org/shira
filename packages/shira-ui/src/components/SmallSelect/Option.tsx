import { FunctionComponent } from "react";
import { OptionInterface } from "./SmallSelect";
import styled from 'styled-components'
import { defaultTheme } from "../../theme";

interface Props {
  option: OptionInterface;
  index: number;
  submit: () => void
}

export const Option: FunctionComponent<Props> = ({
  option,
  index,
  submit
}) => {

  return (
    <OptionWrapper onClick={submit}>
      {index > 0 && (
        <Separate />
      )}
      <Label
        key={option.value}
      >
        {option.label}
      </Label>
      <LabelEnglish>
        {option.labelEnglish}
      </LabelEnglish>
    </OptionWrapper>
  )
}

const Label = styled.div`
  padding: 11px 0 8px 11px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-top: 16px;
  }  
`;

const Separate = styled.div`
  height: 1px;
  background: ${defaultTheme.colors.dark.mediumGrey};
`;

const LabelEnglish = styled.p`
  font-size: 14px;
  padding: 0 0 9px 11px;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-bottom: 16px;
  }
`;

const OptionWrapper = styled.div`
  transition: all 0.2s;
  text-align: left;
  &:hover {
    background: #eee;
  }
`;
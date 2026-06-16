import { FunctionComponent } from "react"
import styled from "styled-components"
import { LanguageSelectOption } from "../LanguageSelect"

interface Props {
  option: LanguageSelectOption
  index: number
  submit: () => void
  alternativeStyling: boolean
}

export const Option: FunctionComponent<Props> = ({ option, index, submit, alternativeStyling = false }) => {
  return (
    <OptionWrapper
      onClick={submit}
      $alternativeStyling={alternativeStyling}
    >
      {index > 0 && <Separate />}
      <Label>{option.label}</Label>
      {option.labelEnglish && <LabelEnglish>{option.labelEnglish}</LabelEnglish>}
    </OptionWrapper>
  )
}

const Label = styled.div`
  padding: 11px 0 8px 11px;

  @media (max-width: ${(props: any) => props.theme.breakpoints.sm}) {
    padding-top: 16px;
  }
`

const LabelEnglish = styled.p`
  font-size: 14px;
  padding: 0 0 9px 11px;
  margin: 0;

  @media (max-width: ${(props: any) => props.theme.breakpoints.sm}) {
    padding-bottom: 16px;
  }
`

const Separate = styled.div`
  height: 1px;
  background: #ACADAE;
`

const OptionWrapper = styled.div<{ $alternativeStyling: boolean }>`
  transition: all 0.2s;
  text-align: left;
  &:hover {
    background: ${(props) => props.$alternativeStyling ? props.theme.colors.blue1 : '#eee'};
  }
`

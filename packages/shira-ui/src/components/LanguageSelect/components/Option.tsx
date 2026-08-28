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
      {option.nativeLabel && <NativeLabel>{option.nativeLabel}</NativeLabel>}
    </OptionWrapper>
  )
}

const Label = styled.div`
  padding-top: 11px;
  padding-inline-end: 0;
  padding-bottom: 8px;
  padding-inline-start: 11px;

  @media (max-width: ${(props: any) => props.theme.breakpoints.sm}) {
    padding-top: 16px;
  }
`

const NativeLabel = styled.p`
  font-size: 14px;
  padding-top: 0;
  padding-inline-end: 0;
  padding-bottom: 9px;
  padding-inline-start: 11px;
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
  text-align: start;
  &:hover {
    background: ${(props) => props.$alternativeStyling ? props.theme.colors.blue1 : '#eee'};
  }
`

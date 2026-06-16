import { FunctionComponent } from "react"
import styled from "styled-components"
import { LanguageSelectOption } from "../LanguageSelect"
import { Option } from "./Option"

interface Props {
  cancel: () => void
  options: LanguageSelectOption[]
  submit: (option: LanguageSelectOption) => void
}

export const MobileOptions: FunctionComponent<Props> = ({ cancel, options, submit }) => {
  return (
    <Wrapper>
      <div>
        <Title>Select language</Title>
        <OptionsWrapper>
          {options.map((o, i) => (
            <Option
              alternativeStyling={false}
              key={o.value}
              option={o}
              index={i}
              submit={() => submit(o)}
            />
          ))}
        </OptionsWrapper>
      </div>

      <Buttons>
        <CancelButton onClick={cancel}>Cancel</CancelButton>
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: none;

  @media (max-width: ${(props: any) => props.theme.breakpoints.xs}) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }
`

const OptionsWrapper = styled.div`
  text-align: left;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  padding: 16px 0;
  border-bottom: 1px solid #ACADAE;
  text-align: center;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`

const CancelButton = styled.button`
  background: transparent;
  border: 2px solid #ACADAE;
  border-radius: 100px;
  padding: 12px 32px;
  font-size: 16px;
  cursor: pointer;
`

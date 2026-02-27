import { FunctionComponent, useState } from "react";
import { Option } from "./Option";
import { Button } from "../Button";
import styled from 'styled-components'
import { OptionInterface } from "./SmallSelect";

interface Props {
  cancel: () => void
  options: OptionInterface[]
  submit: (OptionInterface) => void
}

export const MobileOptions: FunctionComponent<Props> = ({
  cancel,
  options,
  submit
}) => {

  const [selected, handleSelected] = useState(null)

  return (
    <Wrapper>
      <div>
        <Title>
          Select language
        </Title>

        <OptionsWrapper>
          {options.map((o, i) => (
            <StyledOption
              option={o}
              isSelected={selected && o.value === selected.value}
              index={i}
              submit={() => {
                // handleSelected(o)
                submit(o)
              }}
            />
          ))}
        </OptionsWrapper>

      </div>


      <Buttons>
        <Button
          onClick={() => {
            handleSelected(null)
            cancel()
          }}
          text={'Cancel'}
          type="outline"
        />
        <Button
          onClick={() => {
            submit(selected)
            handleSelected(null)
          }}
          text={'OK'}
        />
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
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
  color: ${props => props.theme.primary.dark};
`

interface StyledOptionI {
  isSelected: boolean
}

const StyledOption = styled(Option) <StyledOptionI>`

  ${props => props.isSelected && `
    background: #eee;
  `}
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px 0;
  text-align: center;


  > button {
    padding: 16px 0;
    width: 156px;
    display: flex;
    justify-content: center;
  }
`
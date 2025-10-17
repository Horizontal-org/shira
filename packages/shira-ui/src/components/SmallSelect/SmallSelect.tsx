import {
  FunctionComponent,
  useState,
  useRef,
} from "react";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { MobileOptions } from "./MobileOptions";
import { Option } from "./Option";
import { useLanguageSelection } from "./useLanguageSelection";
import { useOnClickOutside } from "./useOnClickOutside";
import { Body4 } from "../Typography";
import LanguageIcon from "../Icons/LanguageIcon";
import { styled } from "styled-components";
import { defaultTheme } from "../..";

export interface OptionInterface {
  label: string;
  labelEnglish: string;
  value: string;
}

export interface SmallSelectProps {
  autoselect?: boolean;
  options: OptionInterface[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SmallSelect: FunctionComponent<SmallSelectProps> = ({
  options,
  autoselect,
  onChange,
  placeholder,
}) => {

  const optionsRef = useRef(null)
  useOnClickOutside(optionsRef, () => {
    if (open) handleOpen(false)
  })

  const [open, handleOpen] = useState<boolean>(false)
  const { selected, handleSelected } = useLanguageSelection({
    options,
    autoselect,
    onChange
  });

  const hasSelection = Boolean(selected);

  return (
    <StyledSelect ref={optionsRef}>

      <SelectBox onClick={() => { handleOpen(!open) }}>
        <div>
          <LeftIcon>
            <LanguageIcon />
          </LeftIcon>
          <Label
            aria-label={hasSelection ? selected!.label : placeholder}
            data-placeholder={hasSelection ? "false" : "true"}
          >
            {hasSelection ? selected!.label : placeholder}
          </Label>
        </div>
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </SelectBox>

      {open && (
        <>
          <Options>
            {options.map((o, i) => (
              <Body4>
                <Option
                  key={o.value}
                  option={o}
                  index={i}
                  submit={() => {
                    handleSelected(o)
                    handleOpen(false)
                    onChange(o.value)
                  }}
                />
              </Body4>
            ))}
          </Options>

          <MobileOptions
            cancel={() => { handleOpen(false) }}
            options={options}
            submit={(o) => {
              handleSelected(o)
              handleOpen(false)
              onChange(o.value)
            }}
          />
        </>
      )
      }
    </StyledSelect >
  )
}

const StyledSelect = styled.div`
  position: relative;
  min-width: 210px;
`;

const SelectBox = styled.div`

  background: white;
  border-radius: 100px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 5px 2px 28px -8px;
  
  > div {
    display: flex;
    align-items: center;
    > span {
      color: ${defaultTheme.colors.dark.black};
      font-weight: 400;
      padding-left: 18px;
    }
  } 
  
  > svg {
    stroke: ${defaultTheme.colors.dark.mediumGrey};
  }
`;

const Options = styled.div`
  background: white;
  box-sizing: border-box;
  position: absolute;
  top: 70px;
  min-width: 170px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.4) 5px 2px 28px -8px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`;

const LeftIcon = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4px;
`;

const Label = styled.span`
  padding-left: 18px;
  font-weight: 400;
  color: ${defaultTheme.colors.dark.black};

  &[data-placeholder="true"] {
    color: ${defaultTheme.colors.dark.mediumGrey};
    opacity: .9;
  }
`;
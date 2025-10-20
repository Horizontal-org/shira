import { FunctionComponent, useState, useRef } from "react";
import { Option as SelectOption } from "./Option";
import { useOnClickOutside } from "./useOnClickOutside";
import { styled } from "styled-components";
import { defaultTheme } from "../../theme";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MobileOptions } from "./MobileOptions";

export interface OptionInterface {
  label: string;
  value: string;
  labelEnglish?: string;
  leftIcon?: React.ReactNode;
}

export interface SmallSelectProps {
  options: OptionInterface[];
  value?: string;
  onChange: (value: string) => void;
  initialPlaceholder?: string;
  placeholderLeftIcon?: React.ReactNode;
  fixedLeftIcon?: React.ReactNode;
}

export const SmallSelect: FunctionComponent<SmallSelectProps> = ({
  options,
  value,
  onChange,
  initialPlaceholder,
  placeholderLeftIcon,
  fixedLeftIcon
}) => {

  const optionsRef = useRef(null);
  const [open, setOpen] = useState(false);

  useOnClickOutside(optionsRef, () => {
    if (open) { setOpen(false); isSelected = false; }
  });

  const selected = options.find((o) => o.value === value);

  let isSelected = Boolean(selected);
  const currentLeftIcon =
    fixedLeftIcon ?? (
      isSelected
        ? selected?.leftIcon
        : placeholderLeftIcon
    );

  return (
    <StyledSelect ref={optionsRef}>

      <SelectBox
        tabIndex={0}
        onClick={() => { setOpen(!open) }}
      >
        <OptionWrapper>
          <LeftIcon>
            {currentLeftIcon}
          </LeftIcon>
          <Label
            aria-label={isSelected ? selected!.label : (initialPlaceholder ?? '')}
            data-placeholder={isSelected ? "false" : "true"}
          >
            {isSelected ? selected!.label : initialPlaceholder}
          </Label>
        </OptionWrapper>
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </SelectBox>

      {
        open && (
          <>
            <Options role="listbox">
              {options.map((option, index) => (
                <SelectOption
                  key={option.value}
                  option={option}
                  index={index}
                  submit={() => {
                    setOpen(false)
                    onChange(option.value)
                  }}
                />
              ))}
            </Options>

            <MobileOptions
              cancel={() => { setOpen(false) }}
              options={options}
              submit={(o) => {
                setOpen(false)
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
  min-width: 100px;
`;

const SelectBox = styled.div`
  background: ${defaultTheme.colors.light.white};
  color: ${defaultTheme.colors.dark.darkGrey};
  border-radius: 100px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 5px 2px 28px -8px;
  position: relative;
  z-index: 1;
  
  > div {
    display: flex;
    align-items: center;
    > span {
      color: ${defaultTheme.colors.dark.black};
      font-weight: 400;
      padding-left: 18px;
    }
  } 
`;

const Options = styled.div`
  display: grid;
  background: ${defaultTheme.colors.light.white};
  position: absolute;
  top: 45px;
  min-width: 170px;
  padding: 6px 0;
  cursor: pointer;
  border-radius: 12px;
  z-index: 9999; 
  box-shadow: rgba(0, 0, 0, 0.2) 5px 2px 28px -8px;
  overflow: hidden;
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LeftIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
`;

const Label = styled.span`
  font-weight: 400;
  color: ${defaultTheme.colors.dark.black};
`;
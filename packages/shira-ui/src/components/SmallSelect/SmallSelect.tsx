import { FunctionComponent, useCallback, useMemo, useRef, useState } from "react";
import { Option as SelectOption } from "./Option";
import { useOnClickOutside } from "./useOnClickOutside";
import { styled } from "styled-components";
import { defaultTheme } from "../../theme";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MobileOptions } from "./MobileOptions";
import { useToggleKeydown } from "./useToggleKeydown";

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
  fixedLeftIcon,
}) => {
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  useOnClickOutside(optionsRef, () => {
    if (open) close();
  });

  const handleKeyDown = useToggleKeydown<HTMLDivElement>({
    onToggle: toggleOpen,
    onClose: close,
  });

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const isSelected = Boolean(selected);

  const currentLeftIcon = fixedLeftIcon ?? (isSelected ? selected?.leftIcon : placeholderLeftIcon);

  return (
    <StyledSelect ref={optionsRef}>
      <SelectBox
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
      >
        <div>
          <LeftIcon>{currentLeftIcon}</LeftIcon>
          <Label
            aria-label={isSelected ? selected!.label : (initialPlaceholder ?? "")}
            data-placeholder={isSelected ? "false" : "true"}
          >
            {isSelected ? selected!.label : initialPlaceholder}
          </Label>
        </div>
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </SelectBox>

      {open && (
        <>
          <Options role="listbox">
            {options.map((option, index) => (
              <SelectOption
                key={option.value}
                option={option}
                index={index}
                submit={() => {
                  close();
                  onChange(option.value);
                }}
              />
            ))}
          </Options>

          <MobileOptions
            cancel={close}
            options={options}
            submit={(o) => {
              close();
              onChange(o.value);
            }}
          />
        </>
      )}
    </StyledSelect>
  );
};

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
  cursor: pointer;
  border-radius: 12px;
  z-index: 9999;
  box-shadow: rgba(0, 0, 0, 0.2) 5px 2px 28px -8px;
  overflow: hidden;
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

import { ReactNode } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { Body4 } from '../Typography';
import { defaultTheme } from '../..';
import { useFloatingSelect } from '../../hooks/useFloatingSelect';

export interface FilterSelectOption {
  value: string;
  label: string;
}

export interface FilterSelectProps {
  options: FilterSelectOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder: string;
  leftIcon?: ReactNode;
  ariaLabel?: string;
  className?: string;
  isMulti?: boolean;
  selectedLabel?: string;
  onClear?: () => void;
}

export const FilterSelect = ({
  options,
  value,
  onChange,
  placeholder,
  leftIcon,
  ariaLabel,
  className,
  isMulti = false,
  selectedLabel,
  onClear,
}: FilterSelectProps) => {
  const {
    isOpen,
    listboxId,
    optionsRef,
    portalNode,
    position,
    setIsOpen,
    triggerRef,
  } = useFloatingSelect();

  const selectedValues = Array.isArray(value) ? value : [];
  const selectedOption = !Array.isArray(value)
    ? options.find((option) => option.value === value)
    : undefined;
  const hasSelection = Array.isArray(value)
    ? value.length > 0
    : Boolean(value);
  const selectedOptions = isMulti
    ? options.filter((option) => selectedValues.includes(option.value))
    : [];
  const resolvedSelectedLabel = selectedLabel ?? (isMulti
    ? selectedOptions.map((option) => option.label).join(", ")
    : selectedOption?.label);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange(isMulti ? [] : "");
    }

    setIsOpen(false);
  };

  const handleSelect = (nextValue: string) => {
    if (isMulti) {
      const nextSelectedValues = selectedValues.includes(nextValue)
        ? selectedValues.filter((selectedValue) => selectedValue !== nextValue)
        : [...selectedValues, nextValue];

      onChange(nextSelectedValues);
      return;
    }

    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <Wrapper className={className}>
      <Trigger
        $hasValue={hasSelection}
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-label={ariaLabel ?? placeholder}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <TriggerContent>
          {leftIcon && <Icon>{leftIcon}</Icon>}
          <Label $hasValue={hasSelection}>
            {resolvedSelectedLabel ? (
              <>
                <LabelPrefix>{`${placeholder}: `}</LabelPrefix>
                <SelectedValue>{resolvedSelectedLabel}</SelectedValue>
              </>
            ) : (
              placeholder
            )}
          </Label>
        </TriggerContent>
        {hasSelection ? (
          <ClearButton
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleClear();
            }}
          >
            <FiX size={16} />
          </ClearButton>
        ) : (
          <Chevron>
            {isOpen
              ? <FiChevronUp color={defaultTheme.colors.dark.darkGrey} size={16} />
              : <FiChevronDown color={defaultTheme.colors.dark.darkGrey} size={16} />}
          </Chevron>
        )}
      </Trigger>

      {isOpen && createPortal(
        <Options
          ref={optionsRef}
          role="listbox"
          id={listboxId}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${Math.max(position.width, 160)}px`,
          }}
        >
          {options.map((option) => (
            <Option
              key={option.value}
              type="button"
              $isSelected={isMulti ? selectedValues.includes(option.value) : option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {isMulti && (
                <Checkbox
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  readOnly
                  tabIndex={-1}
                  aria-hidden="true"
                />
              )}
              {option.label}
            </Option>
          ))}
        </Options>,
        portalNode,
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-width: 160px;
`;

const Trigger = styled.button<{ $hasValue?: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  min-height: 24px;
  width: 100%;
  padding: 6px 12px;
  border-radius: 100px;
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  background: ${props => props.$hasValue ? props.theme.colors.light.paleGreen : props.theme.colors.light.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
`;

const TriggerContent = styled.span`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const Label = styled(Body4) <{ $hasValue: boolean }>`
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  color: ${props => props.theme.colors.dark.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LabelPrefix = styled.span`
  flex: 0 0 auto;
`;

const SelectedValue = styled.span`
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
`;

const Chevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const ClearButton = styled.button`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  background: transparent;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  cursor: pointer;
  color: ${props => props.theme.colors.dark.mediumGrey};
`;

const Options = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.light.white};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10);
  z-index: 1000;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Option = styled.button<{ $isSelected: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: ${props => props.$isSelected ? props.theme.colors.light.paleGreen : props.theme.colors.light.white};
  color: ${props => props.theme.colors.dark.darkGrey};
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.dark.lightGrey};
  }

  &:hover {
    background: ${props => props.$isSelected ? props.theme.colors.light.paleGreen : props.theme.colors.light.paleGrey};
  }
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: ${props => props.theme.colors.green6};
  pointer-events: none;
`;

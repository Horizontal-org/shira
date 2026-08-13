import { ReactNode } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { Body4 } from '../Typography';
import { CheckboxIndicator } from '../Checkbox';
import { defaultTheme } from '../..';
import { useFloatingSelect } from '../../hooks/useFloatingSelect';

export interface FilterSelectOption {
  value: string;
  label: string;
}

export type FilterSelectSize = 'small' | 'big';

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
  size?: FilterSelectSize;
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
  size = 'small',
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
    <Wrapper className={className} $size={size}>
      <Trigger
        $hasValue={hasSelection}
        $size={size}
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-label={ariaLabel ?? placeholder}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <TriggerContent $size={size}>
          {leftIcon && <Icon>{leftIcon}</Icon>}
          <Label $hasValue={hasSelection} $size={size}>
            {resolvedSelectedLabel ? (
              <>
                <LabelPrefix>{`${placeholder}: `}</LabelPrefix>
                <SelectedValue $size={size}>{resolvedSelectedLabel}</SelectedValue>
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
            <FiX />
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
          $size={size}
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
              $size={size}
              onClick={() => handleSelect(option.value)}
            >
              {isMulti && (
                <CheckboxIndicator
                  checked={selectedValues.includes(option.value)}
                  size={18}
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

const Wrapper = styled.div<{ $size: FilterSelectSize }>`
  position: relative;
  min-width: 160px;

  ${({ $size }) => $size === 'big' && `
    width: 360px;
    max-width: 100%;
  `}
`;

const Trigger = styled.button<{ $hasValue?: boolean; $size: FilterSelectSize }>`
  appearance: none;
  -webkit-appearance: none;
  min-height: 32px;
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

  ${({ $size, $hasValue }) => $size === 'big' && `
    min-height: 32px;
    padding: 6px 10px;
    border-radius: 100px;
    width: 80%;
    border: 1px solid ${defaultTheme.colors.dark.lightGrey};
    background: ${$hasValue ? defaultTheme.colors.light.paleGreen : defaultTheme.colors.light.white};
  `}

`;

const TriggerContent = styled.span<{ $size: FilterSelectSize }>`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 16px;
  overflow: hidden;

`;

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 0;

  svg {
    display: block;
  }
`;

const Label = styled(Body4) <{ $hasValue: boolean; $size: FilterSelectSize }>`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  line-height: 1.4;
  color: ${props => props.theme.colors.dark.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $size }) => $size === 'big' && `
    font-size: 14px;
    font-weight: 400;
    color: #333030;
  `}
`;

const LabelPrefix = styled.span`
  flex: 0 0 auto;
`;

const SelectedValue = styled.span<{ $size?: FilterSelectSize }>`
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;

  ${({ $size }) => $size === 'big' && `
    font-weight: 700;
  `}

`;

const Chevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  line-height: 0;

  svg {
    display: block;
  }
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
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 16px;
  line-height: 0;

  svg {
    display: block;
  }
`;

const Options = styled.div<{ $size: FilterSelectSize }>`
  position: absolute;
  background: ${props => props.theme.colors.light.white};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10);
  pointer-events: auto;
  z-index: 1000;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;

  ${({ $size }) => $size === 'big' && `
    max-height: 500px;
    border-radius: 12px;
    box-shadow:
      0 -3px 8px 1px rgba(0, 0, 0, 0.05),
      0 -4px 8px 0 rgba(0, 0, 0, 0.03),
      0 3px 8px 1px rgba(0, 0, 0, 0.05),
      0 4px 8px 0 rgba(0, 0, 0, 0.03);
  `}

`;

const Option = styled.button<{ $isSelected: boolean; $size: FilterSelectSize }>`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: ${props => {
    if (!props.$isSelected) return props.theme.colors.light.white;
    return props.$size === 'big' ? 'transparent' : props.theme.colors.light.paleGreen;
  }};
  color: ${props => props.theme.colors.dark.darkGrey};
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  ${({ $size }) => $size === 'big' && `
    padding: 12px 11px;
    font-size: 14px;
    line-height: 1;
  `}

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.dark.lightGrey};

  }

  &:hover {
    background: ${props => props.$size === 'big'
    ? props.theme.colors.light.paleGrey
    : props.$isSelected ? props.theme.colors.light.paleGreen : props.theme.colors.light.paleGrey};
  }
`;

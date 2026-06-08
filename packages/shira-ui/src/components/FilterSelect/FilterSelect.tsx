import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Body4 } from '../Typography';

export interface FilterSelectOption {
  value: string;
  label: string;
}

export interface FilterSelectProps {
  options: FilterSelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  leftIcon?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

const PORTAL_ID = 'filter-select-portal-container';

export const FilterSelect = ({
  options,
  value,
  onChange,
  placeholder,
  leftIcon,
  ariaLabel,
  className,
}: FilterSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!document.getElementById(PORTAL_ID)) {
      const portalContainer = document.createElement('div');
      portalContainer.id = PORTAL_ID;
      document.body.appendChild(portalContainer);
    }

    return () => {
      const portalContainer = document.getElementById(PORTAL_ID);
      if (portalContainer && portalContainer.childNodes.length === 0) {
        document.body.removeChild(portalContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return;
    }

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updatePosition();

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (
        triggerRef.current?.contains(event.target)
        || optionsRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <Wrapper className={className}>
      <Trigger
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
          <Label $hasValue={Boolean(selectedOption)}>
            {selectedOption?.label ?? placeholder}
          </Label>
        </TriggerContent>
        <Chevron>
          {isOpen ? <FiChevronUp color="#8A8F98" size={16} /> : <FiChevronDown color="#8A8F98" size={16} />}
        </Chevron>
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
              $isSelected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </Option>
          ))}
        </Options>,
        document.getElementById(PORTAL_ID) || document.body,
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  min-width: 160px;
`;

const Trigger = styled.button`
  appearance: none;
  -webkit-appearance: none;
  min-height: 24px;
  width: 100%;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  background: ${props => props.theme.colors.light.white};
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

const Label = styled(Body4)<{ $hasValue: boolean }>`
  color: ${props => props.$hasValue
    ? props.theme.colors.dark.black
    : props.theme.colors.dark.mediumGrey};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Chevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const Options = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.light.white};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10);
  z-index: 99999999;
  overflow: hidden;
`;

const Option = styled.button<{ $isSelected: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: ${props => props.$isSelected ? props.theme.colors.light.paleGrey : props.theme.colors.light.white};
  color: ${props => props.theme.colors.dark.darkGrey};
  text-align: left;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.dark.lightGrey};
  }

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
  }
`;

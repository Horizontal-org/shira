import { useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Body2Regular } from '../Typography';
import { defaultTheme } from '../../theme';

export interface SortSelectOption {
  value: string;
  label: string;
}

export interface SortSelectProps {
  options: SortSelectOption[];
  value: string;
  onChange: (value: string) => void;
  prefix: string;
  ariaLabel?: string;
  className?: string;
}

const PORTAL_ID = 'sort-select-portal-container';

export const SortSelect = ({
  options,
  value,
  onChange,
  prefix,
  ariaLabel,
  className,
}: SortSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selectedOption = options.find((option) => option.value === value) ?? options[0];

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

      const menuWidth = Math.max(rect.width, 252);
      let left = rect.left + window.scrollX;

      if (left + menuWidth > window.innerWidth) {
        left = rect.right - menuWidth + window.scrollX;
      }

      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left,
        width: menuWidth,
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
        aria-label={ariaLabel ?? prefix}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <TriggerLabel>
          <Prefix>{prefix}</Prefix>
          <Value>{selectedOption?.label}</Value>
        </TriggerLabel>
        <Chevron>
          {isOpen
            ? <FiChevronUp color={defaultTheme.colors.dark.mediumGrey} size={18} />
            : <FiChevronDown color={defaultTheme.colors.dark.mediumGrey} size={18} />}
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
            width: `${position.width}px`,
          }}
        >
          {options.map((option) => (
            <Option
              key={option.value}
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
  min-width: 280px;
`;

const Trigger = styled.button`
  -webkit-appearance: none;
  min-height: 42px;
  width: 100%;
  padding: 12px 20px;
  border-radius: 24px;
  border: 1px solid ${props => props.theme.colors.dark.mediumGrey};
  background: ${props => props.theme.colors.light.white};
  color: ${props => props.theme.colors.dark.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
`;

const TriggerLabel = styled.span`
  min-width: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
  overflow: hidden;
`;

const Prefix = styled(Body2Regular)`
  color: ${props => props.theme.colors.dark.black};
  white-space: nowrap;
`;

const Value = styled(Body2Regular)`
  color: ${props => props.theme.colors.dark.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Chevron = styled.span`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const Options = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.light.white};
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 99999999;
  overflow: hidden;
`;

const Option = styled.button<{ $isSelected: boolean }>`
  -webkit-appearance: none;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: ${props => props.theme.colors.light.white};
  cursor: pointer;
  color: ${props => props.theme.colors.dark.black};
  text-align: left;
  font-size: 16px;
  line-height: 1.4;
  gap: 4px;

  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.dark.lightGrey};
  }

  &:hover {
    background: ${props => props.theme.colors.light.paleGrey};
  }
`;

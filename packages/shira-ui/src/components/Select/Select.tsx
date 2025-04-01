import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export interface SelectProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  value?: string;
}

export const SelectComponent = ({ label, options, onChange, value }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || options[0]);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('select-portal-container')) {
      const portalContainer = document.createElement('div');
      portalContainer.id = 'select-portal-container';
      document.body.appendChild(portalContainer);
    }
    
    return () => {
      const portalContainer = document.getElementById('select-portal-container');
      if (portalContainer && portalContainer.childNodes.length === 0) {
        document.body.removeChild(portalContainer);
      }
    };
  }, []);

  // update dropdown position when opened
  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current && 
        !selectRef.current.contains(event.target as Node) &&
        optionsRef.current && 
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <SelectWrapper ref={selectRef}>
      <LabelWrapper>
        {label && <Label>{label}</Label>}
      </LabelWrapper>
      <SelectBox onClick={() => setIsOpen(!isOpen)}>
        <SelectedOption>{selectedOption}</SelectedOption>
        <Arrow>
          {isOpen ?  <FiChevronUp color='#5F6368'/> : <FiChevronDown color='#5F6368'/>}
        </Arrow>
      </SelectBox>
      
      {isOpen && createPortal(
        <OptionsContainer 
          ref={optionsRef}
          style={{ 
            top: `${position.top}px`, 
            left: `${position.left}px`,
            width: `${position.width}px` 
          }}
        >
          {options.map((option) => (
            <Option 
              key={option} 
              onClick={() => handleSelect(option)}
              isSelected={option === selectedOption}
            >
              {option}
            </Option>
          ))}
        </OptionsContainer>,
        document.getElementById('select-portal-container') || document.body
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 16px 0;
`;

const LabelWrapper = styled.div`
  margin-bottom: 4px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #424242;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.colors.green3};
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #F0F5E0;
  }
`;

const SelectedOption = styled.div`
  font-size: 18px;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-weight: 300;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border: 2px solid ${props => props.theme.colors.green3};
  color: ${props => props.theme.colors.dark.darkGrey};
  border-radius: 8px;
  background: white;
  z-index: 99999999;
  max-height: 250px;
  overflow-y: auto;
  font-weight: 300;
`;

const Option = styled.div<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
  background: ${props => props.isSelected ? '#F0F5E0' : 'white'};
  
  &:hover {
    background: #F0F5E0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

export default SelectComponent;
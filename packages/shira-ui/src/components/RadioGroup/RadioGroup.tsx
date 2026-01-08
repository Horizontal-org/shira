import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { Body1 } from '../Typography';

export interface RadioGroupOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  legend?: ReactNode;
  value?: string | null;
  onChange: (value: string) => void;
  options: RadioGroupOption[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  name,
  legend,
  value,
  onChange,
  options,
  disabled = false,
  required = false,
  className,
}) => {
  return (
    <FieldSet className={className}>
      {legend && (
        <RadioGroupLabel $required={required}>
          <Body1>{legend}</Body1>
        </RadioGroupLabel>
      )}
      {options.map((option) => {
        const optionDisabled = disabled || option.disabled;
        const optionId = `${name}-${option.value}`;

        return (
          <OptionWrapper key={option.value} $disabled={optionDisabled}>
            <OptionRow>
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value !== null && value !== "" && value === option.value}
                onChange={() => onChange(option.value)}
                disabled={optionDisabled}
              />
              <OptionLabel htmlFor={optionId}>
                <Body1>{option.label}</Body1>
              </OptionLabel>
            </OptionRow>
          </OptionWrapper>
        );
      })}
    </FieldSet>
  );
};

const FieldSet = styled.fieldset`
  margin-top: 16px;
  margin-bottom: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
`;

const OptionWrapper = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  input[type='radio'] {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 18px;
    height: 18px;
    border: 0.15em solid ${(props) => props.theme.colors.green6};
    border-radius: 50%;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
    cursor: pointer;
  }

  input[type='radio']::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    background-color: ${(props) => props.theme.colors.green6};
  }

  input[type='radio']:checked::before {
    transform: scale(1);
  }

  input[type='radio']:focus {
    outline: max(2px, 0.15em) solid ${(props) => props.theme.colors.green6};
    outline-offset: max(2px, 0.15em);
  }

  ${(props) =>
    props.$disabled &&
    `
    input[type='radio'] {
      border-color: ${props.theme.colors.dark.lightGrey};
      background-color: ${props.theme.colors.dark.lightGrey};
      cursor: not-allowed;
    }

    input[type='radio']::before {
      background-color: ${props.theme.colors.dark.darkGrey};
    }
  `};
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OptionLabel = styled.label`
  font-weight: 400;
  font-size: 16px;
`;

const RadioGroupLabel = styled.legend<{ $required?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;

  &:before {
    content: ${(props) => (props.$required ? "'* '" : "''")};
    color: red;
  }
`;

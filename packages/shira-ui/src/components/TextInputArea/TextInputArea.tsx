import { type ChangeEventHandler, type FocusEventHandler, type FunctionComponent } from "react";
import styled from "styled-components";
import { CharacterCount } from "../CharacterCount";
import { Body4 } from "../Typography";

export interface TextInputAreaProps {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  disabled?: boolean;
  required?: boolean;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  id?: string;
  name?: string;
  maxLength?: number;
  showCharacterCount?: boolean;
  characterLimitErrorText?: string;
  errorText?: string;
  rows?: number;
}

export const TextInputArea: FunctionComponent<TextInputAreaProps> = ({
  placeholder,
  onChange,
  value,
  onFocus,
  name,
  id,
  disabled = false,
  required = false,
  maxLength,
  showCharacterCount = false,
  characterLimitErrorText,
  errorText,
  rows = 2,
}) => {
  const isOverCharacterLimit = showCharacterCount && value.length > maxLength;
  const footerText = isOverCharacterLimit ? characterLimitErrorText : errorText ?? "";
  const isFooterError = isOverCharacterLimit || Boolean(errorText);

  return (
    <Wrapper>
      <StyledTextArea
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
        maxLength={showCharacterCount ? undefined : maxLength}
        onFocus={onFocus}
        rows={rows}
      />
      {(showCharacterCount || footerText) && (
        <FooterRow>
          <SupportingText $disabled={disabled} $isError={isFooterError}>
            {footerText}
          </SupportingText>
          {showCharacterCount && (
            <CharacterCount
              currentLength={value.length}
              maxLength={maxLength}
              disabled={disabled}
            />
          )}
        </FooterRow>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

const SupportingText = styled(Body4) <{ $disabled?: boolean; $isError?: boolean }>`
  flex: 1;
  padding-left: 10px;
  color: ${({ theme, $disabled, $isError }) => {
    if ($disabled) return theme.colors.dark.mediumGrey;
    if ($isError) return theme.colors.error7;
    return theme.colors.dark.darkGrey;
  }};
`;

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 118px;
  padding: 16px;
  border: 2px solid ${(props) => props.theme.colors.green3};
  border-radius: 16px;
  outline: none;
  resize: none;
  font: inherit;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.dark.darkGrey};
  background: ${(props) => props.theme.colors.light.white};

  &::placeholder {
    color: ${(props) => props.theme.colors.dark.darkGrey};
  }

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors.green1};
  }

  &:focus:not(:disabled) {
    background: #f0fff9;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.green3};
  }
`;

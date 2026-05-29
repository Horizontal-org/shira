import { ChangeEventHandler, useState, forwardRef } from "react";
import styled from 'styled-components';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LoadingIcon } from "../LoadingIcon";
import { Body4 } from "../Typography";
import { CharacterCount } from "../CharacterCount";

export interface Props {
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    label?: string;
    disabled?: boolean;
    isLoading?: boolean;
    type?: 'text' | 'password' | 'email';
    required?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    id?: string;
    name?: string;
    maxLength?: number;
    showCharacterCount?: boolean;
    characterLimitErrorText?: string;
    errorText?: string;
}

export const TextInput = forwardRef<HTMLInputElement, Props>(({
    placeholder,
    onChange,
    value,
    label,
    onBlur,
    onFocus,
    name,
    id,
    disabled = false,
    type = 'text',
    required = false,
    isLoading = false,
    maxLength,
    showCharacterCount = false,
    characterLimitErrorText,
    errorText
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasLabel = Boolean(label);
    const showLabel = hasLabel && value !== '';

    const inputPlaceholder = (!showLabel && label) ? label : placeholder;

    const isPassword = type === 'password';
    const inputType = isPassword && !showPassword ? 'password' : 'text';
    const hasTrailingIcon = isPassword || isLoading;

    const isOverCharacterLimit = showCharacterCount && value.length > maxLength;

    const footerText = isOverCharacterLimit ? characterLimitErrorText : errorText ?? "";
    const isFooterError = isOverCharacterLimit || Boolean(errorText);

    return (
        <InputWrapper>
            {showLabel && <Label
                $disabled={disabled}
                $required={required}
            >{label}</Label>}

            <InputContainer>
                <StyledInput
                    $hasTrailingAdornment={hasTrailingIcon}
                    id={id}
                    name={name}
                    type={inputType}
                    onChange={onChange}
                    placeholder={inputPlaceholder}
                    value={value}
                    disabled={disabled}
                    required={required}
                    maxLength={showCharacterCount ? undefined : maxLength}
                    ref={ref}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />

                {isPassword && (
                    <IconButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                    >
                        {showPassword ?
                            <FiEyeOff size={20} color={disabled ? '#aaa' : '#666'} /> :
                            <FiEye size={20} color={disabled ? '#aaa' : '#666'} />
                        }
                    </IconButton>
                )}

                {isLoading && (
                    <LoadingSpinner>
                        <LoadingIcon size={20} />
                    </LoadingSpinner>
                )}
            </InputContainer >

            {(showCharacterCount || footerText) && (
                <FooterRow>
                    <SupportingText
                        $disabled={disabled}
                        $isError={isFooterError}
                    >
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
        </InputWrapper >
    )
})

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
`;

const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
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
    color: ${({ theme, $disabled, $isError }) => {
        if ($disabled) return theme.colors.dark.mediumGrey;
        if ($isError) return theme.colors.error7;
        return theme.colors.dark.darkGrey;
    }};
    flex: 1;
    padding-left: 10px;
`;

const Label = styled.label<{ $disabled?: boolean, $required?: boolean }>`
    font-size: 16px;
    color: ${props => props.$disabled ? '#aaa' : props.theme.colors.dark.black};

    ${props => props.$required && `
        &:before {
            content: "* ";
            color: red;
            margin-left: 4px;
        }
    `}
`;

const StyledInput = styled.input<{ required?: boolean, $hasTrailingAdornment?: boolean }>`
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 16px;
    padding: 12px 16px;
    padding-right: ${props => props.$hasTrailingAdornment ? '48px' : '16px'};
    width: 100%;
    font-weight: 300;
    font-size: 18px;
    background: white;
    border: 2px solid ${props => props.theme.colors.green3};
    color: ${props => props.theme.colors.dark.darkGrey};
    transition: all 0.2s ease-in-out;

    &::placeholder {
        color: ${props => props.theme.colors.dark.darkGrey};
    }

    /* Hover state */
    &:hover:not(:disabled) {
        background: ${props => props.theme.colors.green1};
    }

    /* Focus state */
    &:focus:not(:disabled) {
        background: #f0fff9;
        box-shadow: 0 0 0 2px ${props => props.theme.colors.green3};
    }

    /* Disabled state */
    &:disabled {
        background: #f5f5f5;
        border-color: #ddd;
        color: ${props => props.theme.colors.dark.darkGrey};
        cursor: not-allowed;
    }
`;

const LoadingSpinner = styled.div`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const IconButton = styled.button`
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        cursor: not-allowed;
    }

    &:focus {
        outline: none;
    }
`;

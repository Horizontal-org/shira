import { ChangeEventHandler, FunctionComponent, useState } from "react";
import styled from 'styled-components';
import { FiEye, FiEyeOff } from "react-icons/fi";

export interface Props {
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    label?: string;
    disabled?: boolean;
    type?: 'text' | 'password';
}

export const TextInput: FunctionComponent<Props> = ({
    placeholder,
    onChange,
    value,
    label,
    disabled = false,
    type = 'text'
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const showLabel = value !== '';
    const inputPlaceholder = (!showLabel && label) ? label : placeholder;

    const isPassword = type === 'password';
    const inputType = isPassword && !showPassword ? 'password' : 'text';

    return (
        <InputWrapper>
            {showLabel && <Label $disabled={disabled}>{label}</Label>}
            <InputContainer>
                <StyledInput 
                    type={inputType}
                    placeholder={inputPlaceholder}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
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
            </InputContainer>
        </InputWrapper>
    )
}

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

const Label = styled.label<{ $disabled?: boolean }>`
    font-size: 16px;
    color: ${props => props.$disabled ? '#aaa' : props.theme.secondary.dark};
`;

const StyledInput = styled.input`
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 16px;
    padding: 12px 16px;
    width: 100%;
    font-weight: 400;
    font-size: 18px;
    background: white;
    border: 2px solid ${props => props.theme.secondary.dark};
    color: ${props => props.theme.colors.dark.black};
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
        box-shadow: 0 0 0 2px ${props => `${props.theme.secondary.dark}33`};
    }

    /* Disabled state */
    &:disabled {
        background: #f5f5f5;
        border-color: #ddd;
        color: ${props => props.theme.colors.dark.darkGrey};
        cursor: not-allowed;
    }
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
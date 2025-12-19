import { Body1, Body3, styled } from "@shira/ui";
import { FunctionComponent } from "react"
import { ORG_TYPES } from "..";

interface Props {
  orgType: string
  setOrgType: (type: string) => void
  disabled?: boolean
}

export const RadioGroup: FunctionComponent<Props> = ({ orgType, setOrgType, disabled }) => { 
  return (
    <div>

      <FieldSet id="get-started-org-types">
        <div>
          <Body1>I am creating a Shira space as (required):</Body1>
        </div>
        { ORG_TYPES.map((option) => (
          <OptionWrapper key={option.value} disabled={disabled}>
            <OptionRow>
              <input
                id={`org-type-${option.value}`}
                type="radio"
                name="organization_type"
                value={option.value}
                checked={orgType === option.value}
                onChange={() => setOrgType(option.value)}
              />
              <OptionLabel htmlFor={`org-type-${option.value}`}>
                <Body1>{option.label}</Body1>
              </OptionLabel>
            </OptionRow>
          </OptionWrapper>
        )) }

      </FieldSet>
    </div>
  )
  
}

const FieldSet = styled.fieldset`
  margin-top: 16px;
  margin-bottom: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  input[type="radio"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    margin: 0;

    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid ${props => props.theme.colors.green6};
    border-radius: 50%;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;
  }

  input[type="radio"]::before {
    content: "";
    width: 0.55em;
    height: 0.55em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    /* box-shadow: inset 1em 1em var(--form-control-color); */
    /* Windows High Contrast Mode */
    background-color: ${props => props.theme.colors.green6};
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

  input[type="radio"]:focus {
    outline: max(2px, 0.15em) solid ${props => props.theme.colors.green6};
    outline-offset: max(2px, 0.15em);
  }

  ${props => props.disabled && `
    input[type="radio"] {
      border-color: ${props.theme.colors.dark.lightGrey};
      background-color: ${props.theme.colors.dark.lightGrey};
      cursor: not-allowed;
    }

    input[type="radio"]::before {
      background-color: ${props.theme.colors.dark.darkGrey};
    }
  `};
`

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const OptionLabel = styled.label`
  font-weight: 400;
  font-size: 16px;
`
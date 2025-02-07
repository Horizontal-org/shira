import { 
  FunctionComponent, 
  useEffect, 
  useState, 
  useRef,
} from "react";
import styled from 'styled-components'
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface Option {
  label: string;
  value: string;
}

interface Props {
  autoselect?: boolean;
  options: Option[];
  onChange: (value: string) => void
}

export const Select: FunctionComponent<Props> = ({ 
  options,
  autoselect,
  onChange
}) => {

  const optionsRef = useRef(null)
  useOnClickOutside(optionsRef, () => {
    if (open) handleOpen(false)
  })
  
  const [open, handleOpen] = useState<boolean>(false)
  const [selected, handleSelected] = useState<Option | null>(null)

  useEffect(() => {
    if (options.length > 0 && autoselect) {
      handleSelected(options[0])
    }
  }, [])

  return (
    <StyledSelect ref={optionsRef}>

      <SelectBox onClick={() => { handleOpen(!open)} }>
        <span>
          { selected && selected.label }
        </span>
      </SelectBox>

      { open && (
        <Options >
          { options.map((o) => (
            <Option 
              key={o.value}
              onClick={() => {
                handleSelected(o)                
                handleOpen(false)
                onChange(o.value)
              }}
            >
              { o.label }
            </Option>
          ))}
        </Options>
      )}
    </StyledSelect>
  )
}

const StyledSelect = styled.div`
  width: 140px;
  position: relative;
`


const SelectBox = styled.div`
  border: 2px solid #ddd;
  background: white;
  border-radius: 4px;
  padding: 11px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font-weight: 400;
  }
`

const Options = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 60px;
  width: 140px;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid #AAA;
`

const Option = styled.div`
  padding: 11px 16px;
  transition: all 0.2s;

  &:hover {
    background: #eee;
  }
`
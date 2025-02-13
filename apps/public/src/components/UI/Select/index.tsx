import { 
  FunctionComponent, 
  useEffect, 
  useState, 
  useRef,
} from "react";
import { styled } from '@shira/ui'
import useOnClickOutside from "../../../hooks/useOutsideClick";
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { MobileOptions } from "./components/MobileOptions";
import { Option } from "./components/Option";
import LangIcon from './components/LangIcon'

export interface OptionInterface {
  label: string;
  labelEnglish: string;
  value: string;
}

interface Props {
  autoselect?: boolean;
  options: OptionInterface[];
  onChange: (value: string) => void
}

export const LanguageSelect: FunctionComponent<Props> = ({ 
  options,
  autoselect,
  onChange
}) => {

  const optionsRef = useRef(null)
  useOnClickOutside(optionsRef, () => {
    if (open) handleOpen(false)
  })
  
  const [open, handleOpen] = useState<boolean>(false)
  const [selected, handleSelected] = useState<OptionInterface | null>(null)

  useEffect(() => {
    if (options.length > 0 && autoselect) {
      handleSelected(options[0])
    }
  }, [])

  return (
    <StyledSelect ref={optionsRef}>

      <SelectBox onClick={() => { handleOpen(!open)} }>
        <div>
          <LangIcon />
          <span>
            { selected && selected.label }
          </span>
        </div>
        { open ? <FiChevronUp size={20}/> : <FiChevronDown size={20}/> }
      </SelectBox>

      { open && (
        <>
          <Options>
            { options.map((o, i) => (
              <Option 
                key={o.value}
                option={o}
                index={i}
                submit={() => {
                  handleSelected(o)                
                  handleOpen(false)
                  onChange(o.value)
                }}
              />
            ))}
          </Options>

          <MobileOptions 
            cancel={() => { handleOpen(false) }}
            options={options}
            submit={(o) => {
              handleSelected(o)                
              handleOpen(false)
              onChange(o.value)
            }}
          />
        </>
      )}
    </StyledSelect>
  )
}

const StyledSelect = styled.div`
  position: relative;
  min-width: 170px;
`


const SelectBox = styled.div`
  border: 2px solid #ACADAE;
  background: white;
  border-radius: 100px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.4) 5px 2px 28px -8px;
  
  > div {
    display: flex;
    align-items: center;
    > span {
      color: #333030;
      font-weight: 400;
      padding-left: 18px;
    }
  } 
  
  > svg {
    stroke: #ACADAE;
  }
`

const Options = styled.div`
  background: white;
  box-sizing: border-box;
  position: absolute;
  top: 70px;
  min-width: 170px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.4) 5px 2px 28px -8px;
  font-size: 16px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`
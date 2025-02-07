import { FunctionComponent, useState, SetStateAction, useRef } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'


interface Props {
  addComponent: (componentId: string) => void
  type: string;
  componentOptions: (type: string) => {
    id: string;
    label: string;
    limit: number
  }[]
}



export const AddComponent: FunctionComponent<Props> = ({  
  type,
  addComponent,
  componentOptions
}) => {

  const [showOptions, handleShowOptions] = useState(false)

  const optionsRef = useRef()
  useOnClickOutside(optionsRef, () => handleShowOptions(false));

  return (
    <Wrapper>
      <button type='button' onClick={() => { handleShowOptions(!showOptions) }}>
        add component
      </button>

      { showOptions && (
        <Options ref={optionsRef}>
          { componentOptions(type).map((o) => (
            <Option onClick={() => {
              addComponent(o.id)
              handleShowOptions(false)
            }}>
              { o.label }
            </Option>
          )) }
        </Options>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  min-height: 100px;
`

const Options = styled.div`
  padding: 8px;
  background: #ddd;
  width: 200px;
  position: absolute;
  top: 40px;
  border-radius: 8px;
  
`

const Option = styled.div`
  padding: 4px 8px;
  font-size: 14px;
  margin-bottom: 4px;
  cursor: pointer;
  background: white;
  border-radius: 4px;
`
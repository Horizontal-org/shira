import styled from 'styled-components'
import { FunctionComponent, useRef } from "react";
import { Button } from "../../../Button";

interface Props {
  onImportFiles: (files) => void 
  onExport: () => void
}

export const Exporter: FunctionComponent<Props> = ({
  onImportFiles,
  onExport
}) => {

  const hiddenImportInput = useRef(null);
  const handleImport = (e) => {
    onImportFiles([...e.target.files])
  }

  return (
    <Wrapper>
      <Separator>
        <Button
          text="Import" 
          onClick={async() => {
            hiddenImportInput.current.click();            
          }}
        />
        <input
          type="file"
          multiple={true}
          ref={hiddenImportInput}
          onChange={handleImport}
          style={{display: 'none'}}
        />
      </Separator>
      <Button 
        text="Export"  
        onClick={onExport}
      />
    </Wrapper>
  )
}

const Separator = styled.div`
  padding-right: 8px;
`

const Wrapper = styled.div`
  display: flex;
`
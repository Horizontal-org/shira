import { FunctionComponent } from "react";
import { Body2Regular, styled } from "@shira/ui";
import { MessageTipTapEditor } from "../../../../TipTapEditor/MessageTipTapEditor";

interface Props {
  name: string
  onChange: (value:string) => void
  initialValue: string | null
}

export const TextDragItem: FunctionComponent<Props> = ({
  name,
  onChange,
  initialValue
}) => {
  return (
    <Wrapper>
      <MessageTipTapEditor 
        editorId={`component-${name}`}
        onChange={onChange}        
        initialContent={initialValue}  
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 40px;
`
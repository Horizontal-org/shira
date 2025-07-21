import { FunctionComponent } from "react";
import { Body2Regular, styled } from "@shira/ui";
import { MessageTipTapEditor } from "../../../../TipTapEditor/MessageTipTapEditor";

interface Props {
  name: string
  onChange: (value:string) => void
}

export const TextDragItem: FunctionComponent<Props> = ({
  name,
  onChange
}) => {
  return (
    <Wrapper>
      <MessageTipTapEditor 
        editorId={`component-${name}`}
        onChange={onChange}          
      />
      <p>{name}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`
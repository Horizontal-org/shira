import { FunctionComponent } from "react";
import { Body2Regular, styled } from "@shira/ui";
import { MessageTipTapEditor } from "../../../../TipTapEditor/MessageTipTapEditor";
import { LoadingOverlay } from "../../../../LoadingOverlay/LoadingOverlay";
import { ImageObject } from "../interfaces/MessagingDragItem";

interface Props {
  name: string
  value: ImageObject;
}

export const ImageDragItem: FunctionComponent<Props> = ({
  name,
  value,
}) => {
  console.log("🚀 ~ ImageDragItem ~ name:", name)
  return (
    <Wrapper>
      { value ? (
        <ImageElement 
          src={value.url}
          alt={value.originalFilename}
        />          
      ) : (
        <LoadingOverlay/>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 30px;
  padding-left: 20px;
`

const ImageElement = styled.img`
  border-radius: 4px;      
  max-width: 500px;
  max-height: 400px;
  min-width: 50px;
  min-height: 30px;
  cursor: pointer;
  object-fit: contain;
  border: 2px solid #F3F3F3 !important;

  &.has-explanation {
    border: 2px solid #F3F9CF !important;
  }
    
  &.mark-active {
    border: 2px solid #FCC934 !important;
  }
  
  &:hover {
    opacity: 0.9;
  }
`
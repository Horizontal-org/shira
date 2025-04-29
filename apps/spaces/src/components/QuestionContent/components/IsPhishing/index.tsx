import { FunctionComponent } from "react";
import { Body1, styled } from "@shira/ui";
import { HookIcon } from "./assets/hook";
import { ThumbIcon } from "./assets/thumb";

interface Props {
  isPhishing: boolean
}

export const IsPhishing:FunctionComponent<Props> = ({
  isPhishing
}) => {
  return (
    <Wrapper>
      { isPhishing ? (
        <Content>
          <HookIcon />
          <Body1>You are writing a phishing message</Body1>
        </Content>
      ) : (
        <Content>
          <ThumbIcon />
          <Body1>You are writing a legitimate message</Body1>
        </Content>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: fit-content;
  margin: 12px 0;
  padding: 16px 20px;
  background: #F3F3F3;
  border-radius: 20px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
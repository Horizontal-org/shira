import { FunctionComponent } from "react";
import styled from "styled-components";
import BottomBar from "./BottomBar";
import ChatContent from "./ChatContent";

import TopBar from "./TopBar";

interface Props {
  fullname: {
    textContent: string;
    explanationPosition: string;
  };
  content: HTMLElement;
  isConversationSidebarOpen: boolean;
  onInfoClick: () => void;
}

const Chat: FunctionComponent<Props> = ({
  fullname,
  content,
  isConversationSidebarOpen,
  onInfoClick,
}) => {
  return (
    <ChatWrapper>
      <TopBar
        fullname={fullname}
        isConversationSidebarOpen={isConversationSidebarOpen}
        onInfoClick={onInfoClick}
      />
      <ChatContent
        content={Array.from(content.querySelectorAll('[id*="component-"]'))}
      />{" "} {/* refactor this */}
      <BottomBar />
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  flex-grow: 1;
  border-inline-end: 1px solid #F2F3F5;
  position: relative;

  display: flex;
  flex-direction: column;
`;

export default Chat;

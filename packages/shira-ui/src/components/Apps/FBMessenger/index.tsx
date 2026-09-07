import { FunctionComponent, useState } from "react";
import styled from "styled-components";

import MessageSidebar from "./MessagesSidebar/Index";
import Chat from "./Chat";
import ConversationSidebar from "./ConversationSidebar";

import "../../../fonts/Segoe/style.css";

import { Explanation } from "../../../domain/explanation";
import ExplanationTooltip from "../components/ExplanationTooltip";

interface Props {
  content: HTMLElement;
  senderName: {
    textContent: string;
    explanationPosition: string;
  };
  explanations?: Explanation[];
  explanationNumber?: number;
  showExplanations?: boolean;
}

export const FBMessenger: FunctionComponent<Props> = ({
  senderName,
  content,
  explanations = [],
  explanationNumber,
  showExplanations,
}) => {
  const [isConversationSidebarOpen, setIsConversationSidebarOpen] =
    useState(false);

  return (
    <DesktopWrapper>
      {explanations &&
        explanations.map((explanation) => (
          <ExplanationTooltip
            explanation={explanation}
            explanationNumber={explanationNumber}
            showExplanations={showExplanations}
          />
        ))}
      <Content>
        <MessageSidebar />
        <Chat
          content={content}
          fullname={senderName}
          isConversationSidebarOpen={isConversationSidebarOpen}
          onInfoClick={() => setIsConversationSidebarOpen((isOpen) => !isOpen)}
        />
        {isConversationSidebarOpen && (
          <ConversationSidebar fullname={senderName} />
        )}
      </Content>
    </DesktopWrapper>
  );
};

const DesktopWrapper = styled.div`
  width: 100%;
  height: 100%;
  font-family:
    "Helvetica Neue",
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    ".SFNSText-Regular",
    sans-serif;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  mark {
    background-color: transparent;
    position: relative;
    color: inherit;
    text-decoration: inherit;
  }
`;

export default FBMessenger;

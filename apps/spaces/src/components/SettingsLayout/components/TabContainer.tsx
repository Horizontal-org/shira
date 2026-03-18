import { FunctionComponent, ReactNode, useState } from "react";
import { styled } from "@shira/ui";

type TabType = "account" | "subscription";

interface TabContainerProps {
  accountContent: ReactNode;
  subscriptionContent: ReactNode;
}

export const TabContainer: FunctionComponent<TabContainerProps> = ({
  accountContent,
  subscriptionContent,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("account");

  return (
    <Container>
      <Header>
        <TabsContainer>
          <TabButton
            id="settings-account-tab"
            $isActive={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          >
            Account
          </TabButton>
          <TabButton
            id="settings-subscription-tab"
            $isActive={activeTab === "subscription"}
            onClick={() => setActiveTab("subscription")}
          >
            Subscription
          </TabButton>
        </TabsContainer>
      </Header>

      <div>
        {activeTab === "account" && accountContent}
        {activeTab === "subscription" && subscriptionContent}
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1280px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 28px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 32px;
`;

const TabButton = styled.div<{ $isActive: boolean }>`
  padding: 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.$isActive ? props.theme.colors.green7 : props.theme.colors.dark.darkGrey};
  cursor: pointer;
  border: none;
  border-bottom: 4px solid ${props => props.$isActive ? props.theme.colors.green7 : "transparent"};
  background: transparent;
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 4px solid ${props => props.$isActive ? props.theme.colors.green7 : "#ccc"};
  }
`;

export default TabContainer;

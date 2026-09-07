import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  FiBell,
  FiChevronDown,
  FiLock,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import styled from "styled-components";
import ProfilePicture from "../../Whatsapp/ProfilePicture";

interface Props {
  fullname: {
    textContent: string;
    explanationPosition: string;
  };
}

const ConversationSidebar: FunctionComponent<Props> = ({ fullname }) => {
  const { t } = useTranslation("shira-ui");

  return (
    <Wrapper aria-label={t("messenger.conversation_details")}>
      <Profile>
        <ProfilePicture imageSize="72px" />
        <Name data-explanation={fullname.explanationPosition}>
          {fullname.textContent}
        </Name>
        <Encryption>
          <FiLock />
          {t("messenger.end_to_end_encrypted")}
        </Encryption>
      </Profile>

      <Actions>
        <Action type="button">
          <ActionIcon>
            <FiUser />
          </ActionIcon>
          {t("messenger.profile")}
        </Action>
        <Action type="button">
          <ActionIcon>
            <FiBell />
          </ActionIcon>
          {t("messenger.mute")}
        </Action>
        <Action type="button">
          <ActionIcon>
            <FiSearch />
          </ActionIcon>
          {t("messenger.search_conversation")}
        </Action>
      </Actions>

      <Sections>
        <Section type="button">
          {t("messenger.chat_information")}
          <FiChevronDown />
        </Section>
        <Section type="button">
          {t("messenger.customize_chat")}
          <FiChevronDown />
        </Section>
        <Section type="button">
          {t("messenger.media_files_and_links")}
          <FiChevronDown />
        </Section>
        <Section type="button">
          {t("messenger.privacy_and_support")}
          <FiChevronDown />
        </Section>
      </Sections>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  width: 280px;
  flex: 0 0 280px;
  padding: 28px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #fff;
  color: #050505;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  margin-block-start: 12px;
  font-size: 17px;
  font-weight: 600;
  position: relative;
`;

const Encryption = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-block-start: 10px;
  padding: 5px 10px;
  border-radius: 12px;
  background: #f0f2f5;
  color: #65676b;
  font-size: 12px;

  > svg {
    font-size: 12px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-block: 24px 28px;
`;

const Action = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #050505;
  font: inherit;
  font-size: 12px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #1877f2;
    outline-offset: 3px;
    border-radius: 4px;
  }
`;

const ActionIcon = styled.span`
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: #e4e6eb;
  font-size: 18px;

  ${Action}:hover & {
    background: #d8dadf;
  }
`;

const Sections = styled.div`
  border-block-start: 1px solid #e4e6eb;
  text-align: start;
`;

const Section = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 17px 2px;
  border: 0;
  border-block-end: 1px solid #e4e6eb;
  background: transparent;
  color: #050505;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-align: start;
  cursor: pointer;

  > svg {
    color: #65676b;
    font-size: 16px;
  }

  &:hover {
    background: #f7f8fa;
  }

  &:focus-visible {
    outline: 2px solid #1877f2;
    outline-offset: -2px;
  }
`;

export default ConversationSidebar;

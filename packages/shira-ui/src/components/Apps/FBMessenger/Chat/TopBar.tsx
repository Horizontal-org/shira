import { FunctionComponent } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IoIosInformationCircle } from "react-icons/io";

import CallIcon from "./assets/call.png";
import PhoneIcon from "./assets/video.png";
import BackIcon from "./BackIcon";
import ProfilePicture from "../../Whatsapp/ProfilePicture";
import useGetWidth from "../../hooks/useGetWidth";

interface Props {
  fullname: {
    textContent: string;
    explanationPosition: string;
  };
  isConversationSidebarOpen: boolean;
  onInfoClick: () => void;
}
const TopBar: FunctionComponent<Props> = ({
  fullname,
  isConversationSidebarOpen,
  onInfoClick,
}) => {
  const { width } = useGetWidth();
  const { t } = useTranslation("shira-ui");
  return (
    <Wrapper>
      <UserInfo>
        {width < 490 && (
          <BackIconWrapper>
            <BackIcon />
          </BackIconWrapper>
        )}
        <ProfilePicture />
        <Name>
          <span data-explanation={fullname.explanationPosition}>
            {fullname.textContent}
          </span>
        </Name>
      </UserInfo>
      <FlexWrapper>
        <IconWrapper>
          <Icon icon={CallIcon} size="26" />
        </IconWrapper>

        <IconWrapper>
          <Icon icon={PhoneIcon} size="26" />
        </IconWrapper>

        {width > 490 && (
          <InfoButton
            type="button"
            onClick={onInfoClick}
            aria-label={t("messenger.conversation_details")}
            aria-expanded={isConversationSidebarOpen}
          >
            <IoIosInformationCircle size={26} color="#a300e6" aria-hidden="true" />
          </InfoButton>
        )}
      </FlexWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px;

  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  flex-grow: 1;

  display: flex;
  align-items: center;
`;

const BackIconWrapper = styled.div`
  padding: 0 16px;
`;

const Name = styled.div`
  margin-inline-start: 8px;
  span {
    position: relative;
  }
`;

const FlexWrapper = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: rgba(60, 64, 67, 0.1);
  }

  display: flex;
  align-items: center;
  justify-content: center;
  color: #a300e6;
`;

const InfoButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: rgba(60, 64, 67, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #1877f2;
    outline-offset: 2px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IconProps {
  icon: string;
  size: string;
}

const Icon = styled("div")<IconProps>`
  background-image: url(${(props) => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${(props) => `${props.size}px`};
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
`;

export default TopBar;

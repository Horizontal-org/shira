import { FunctionComponent } from "react";
import {
  FiBell,
  FiChevronRight,
  FiDownload,
  FiInfo,
  FiLock,
  FiPhone,
  FiSearch,
  FiStar,
  FiUsers,
  FiVideo,
} from "react-icons/fi";
import { MdPalette } from "react-icons/md";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import StrangerPicture from "../StrangerPicture";
import { BsImage } from "react-icons/bs";

interface Props {
  phone?: string;
  onBack: () => void;
}

const ContactInfo: FunctionComponent<Props> = ({ phone, onBack }) => {
  const { t } = useTranslation("shira-ui");
  return (
    <Overlay aria-label={t("whatsapp.contact_info")}>
      <Modal
        role="dialog"
        aria-modal="true"
        aria-label={t("whatsapp.contact_info")}
      >
        <Navigation>
          <NavigationTitle>{t("whatsapp.contact")}</NavigationTitle>
          <NavigationItem $active>
            <FiInfo />
            {t("whatsapp.info")}
          </NavigationItem>
          <NavigationItem>
            <BsImage />
            {t("whatsapp.media_links_and_docs")}
          </NavigationItem>
          <NavigationItem>
            <FiStar />
            {t("whatsapp.starred")}
          </NavigationItem>
          <NavigationItem>
            <FiLock />
            {t("whatsapp.encryption")}
          </NavigationItem>
          <NavigationItem>
            <FiUsers />
            {t("whatsapp.groups_in_common")}
          </NavigationItem>
        </Navigation>
        <Panel>
          <PanelTitle>{t("whatsapp.info")}</PanelTitle>
          <Details>
            <Avatar>
              <StrangerPicture />
            </Avatar>
            <ContactName>{t("whatsapp.contact")}</ContactName>
            <PhoneNumber>{phone || t("whatsapp.no_phone_number")}</PhoneNumber>
            <Actions aria-label={t("whatsapp.contact_actions")}>
              <Action type="button">
                <FiPhone />
                <span>{t("whatsapp.voice")}</span>
              </Action>
              <Action type="button">
                <FiVideo />
                <span>{t("whatsapp.video")}</span>
              </Action>
              <Action type="button">
                <FiSearch />
                <span>{t("whatsapp.search")}</span>
              </Action>
            </Actions>
            <Settings>
              <Setting>
                <FiBell />
                <span>{t("whatsapp.mute_notifications")}</span>
                <Value>{t("whatsapp.no")}</Value>
                <FiChevronRight data-mirror-rtl />
              </Setting>
              <Setting>
                <MdPalette />
                <span>{t("whatsapp.chat_theme")}</span>
                <FiChevronRight data-mirror-rtl />
              </Setting>
              <Setting>
                <FiDownload />
                <span>{t("whatsapp.save_to_downloads")}</span>
                <Value>{t("whatsapp.default")}</Value>
                <FiChevronRight data-mirror-rtl />
              </Setting>
            </Settings>
          </Details>
          <Footer>
            <DoneButton type="button" onClick={onBack}>
              {t("whatsapp.done")}
            </DoneButton>
          </Footer>
        </Panel>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  z-index: 10;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 32px;
  box-sizing: border-box;
  background: rgba(11, 20, 26, 0.28);
`;
const Modal = styled.section`
  display: flex;
  width: min(920px, 100%);
  height: min(650px, 100%);
  overflow: hidden;
  border-radius: 18px;
  background: #f0f2f5;
  color: #111b21;
  box-shadow: 0 12px 32px rgba(11, 20, 26, 0.26);
`;
const Navigation = styled.nav`
  width: 260px;
  flex: 0 0 260px;
  padding: 22px 12px;
  box-sizing: border-box;
  border-inline-end: 1px solid #d9dde0;
  background: #f7f8fa;
`;
const NavigationTitle = styled.h2`
  margin: 0 14px 18px;
  font-size: 20px;
`;
const NavigationItem = styled.button<{ $active?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  padding: 11px 14px;
  border: 0;
  border-radius: 8px;
  background: ${(props) => (props.$active ? "#e9edef" : "transparent")};
  color: #111b21;
  font: inherit;
  font-size: 16px;
  text-align: start;
  > svg {
    flex: none;
    font-size: 22px;
  }
`;
const Panel = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
`;
const PanelTitle = styled.h2`
  margin: 0;
  padding: 24px 32px;
  font-size: 18px;
`;
const Details = styled.div`
  flex: 1;
  padding: 26px 28px;
  overflow-y: auto;
  text-align: center;
`;
const Avatar = styled.div`
  display: inline-flex;
  padding: 3px;
  border-radius: 50%;
  > div,
  > div > svg {
    width: 86px;
    height: 86px;
  }
`;
const ContactName = styled.h1`
  margin: 12px 0 4px;
  font-size: 24px;
  font-weight: 600;
`;
const PhoneNumber = styled.p`
  margin: 0;
  color: #667781;
  font-size: 16px;
`;
const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 32px 0 28px;
`;
const Action = styled.button`
  min-height: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 0;
  border-radius: 9px;
  background: #fff;
  color: #111b21;
  font: inherit;
  cursor: pointer;
  > svg {
    color: #00a884;
    font-size: 25px;
    stroke-width: 2;
  }
`;
const Settings = styled.div`
  overflow: hidden;
  border-radius: 9px;
  background: #fff;
  text-align: start;
`;
const Setting = styled.div`
  min-height: 52px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-block-end: 1px solid #e9edef;
  font-size: 16px;
  &:last-child {
    border-block-end: 0;
  }
  > svg {
    color: #54656f;
    font-size: 21px;
  }
  > svg:last-child {
    color: #8696a0;
    font-size: 18px;
  }
`;
const Value = styled.span`
  margin-inline-start: auto;
  color: #667781;
`;
const Footer = styled.footer`
  padding: 20px 26px;
  border-block-start: 1px solid #d9dde0;
  background: #fff;
  text-align: end;
`;
const DoneButton = styled.button`
  padding: 6px 18px;
  border: 0;
  border-radius: 7px;
  background: #21c47b;
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

export default ContactInfo;

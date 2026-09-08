import { FunctionComponent, useEffect, useRef } from "react";
import {
  FiArrowLeft,
  FiBell,
  FiChevronRight,
  FiDownload,
  FiImage,
  FiInfo,
  FiLock,
  FiMoreVertical,
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

interface Props {
  phone?: string;
  onBack: () => void;
}

const ContactInfo: FunctionComponent<Props> = ({ phone, onBack }) => {
  const { t } = useTranslation("shira-ui");
  const modalRef = useRef<HTMLElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousActiveElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const modal = modalRef.current;
    if (!modal) return undefined;

    const getFocusableElements = () =>
      Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

    const focusableElements = getFocusableElements();
    (focusableElements[0] || modal).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onBack();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements();
      if (!elements.length) {
        event.preventDefault();
        modal.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === first || !modal.contains(activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === last || !modal.contains(activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [onBack]);

  return (
    <Overlay aria-label={t("whatsapp.contact_info")}>
      <Modal
        ref={modalRef}
        tabIndex={-1}
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
            <FiImage />
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
          <MobileHeader>
            <MobileCloseButton
              type="button"
              onClick={onBack}
              aria-label={t("whatsapp.back_to_chat")}
            >
              <FiArrowLeft data-mirror-rtl />
            </MobileCloseButton>
            <FiMoreVertical />
          </MobileHeader>
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
            <MobileMedia>
              <MobileSectionHeader>
                <span>{t("whatsapp.media_links_and_docs")}</span>
                <span>
                  {t("whatsapp.media_count")} <FiChevronRight data-mirror-rtl />
                </span>
              </MobileSectionHeader>
              <MediaGrid>
                <MediaPreview $variant={1} />
                <MediaPreview $variant={2} />
                <MediaPreview $variant={3} />
              </MediaGrid>
            </MobileMedia>
            <MobileRows>
              <MobileRow>
                <FiDownload />
                <span>{t("whatsapp.manage_storage")}</span>
                <small>{t("whatsapp.storage_size")}</small>
              </MobileRow>
              <MobileRow>
                <FiBell />
                <span>{t("whatsapp.notifications")}</span>
              </MobileRow>
            </MobileRows>
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
  @media (max-width: 800px) {
    padding: 0;
    background: #f0f2f5;
  }
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
  @media (max-width: 800px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;
const Navigation = styled.nav`
  width: 260px;
  flex: 0 0 260px;
  padding: 22px 12px;
  box-sizing: border-box;
  border-inline-end: 1px solid #d9dde0;
  background: #f7f8fa;
  @media (max-width: 800px) {
    display: none;
  }
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
const MobileHeader = styled.header`
  display: none;
  @media (max-width: 800px) {
    display: flex;
    height: 56px;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-block-end: 1px solid #e1e4e6;
    background: #fff;
    color: #54656f;
    font-size: 22px;
  }
`;
const MobileCloseButton = styled.button`
  @media (max-width: 800px) {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    font-size: 24px;
  }
`;
const PanelTitle = styled.h2`
  margin: 0;
  padding: 24px 32px;
  font-size: 18px;
  @media (max-width: 800px) {
    display: none;
  }
`;
const Details = styled.div`
  flex: 1;
  padding: 26px 28px;
  overflow-y: auto;
  text-align: center;
  @media (max-width: 800px) {
    padding: 28px 0 0;
  }
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
  @media (max-width: 800px) {
    > div,
    > div > svg {
      width: 112px;
      height: 112px;
    }
  }
`;
const ContactName = styled.h1`
  margin: 12px 0 4px;
  font-size: 24px;
  font-weight: 600;
  @media (max-width: 800px) {
    margin-block-start: 14px;
    font-size: 28px;
  }
`;
const PhoneNumber = styled.p`
  margin: 0;
  color: #667781;
  font-size: 16px;
  @media (max-width: 800px) {
    font-size: 18px;
  }
`;
const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 32px 0 28px;
  @media (max-width: 800px) {
    margin: 34px 28px 24px;
  }
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
  @media (max-width: 800px) {
    min-height: auto;
    gap: 9px;
    background: transparent;
    color: #54656f;
    > svg {
      width: 46px;
      height: 46px;
      padding: 11px;
      box-sizing: border-box;
      border-radius: 50%;
      background: #e9edef;
      color: #54656f;
    }
  }
`;
const Settings = styled.div`
  overflow: hidden;
  border-radius: 9px;
  background: #fff;
  text-align: start;
  @media (max-width: 800px) {
    display: none;
  }
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
const MobileMedia = styled.section`
  display: none;
  @media (max-width: 800px) {
    display: block;
    padding: 18px 16px;
    border-block-start: 1px solid #d9dde0;
    background: #fff;
    text-align: start;
  }
`;
const MobileSectionHeader = styled.div`
  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #54656f;
    font-size: 15px;
    > span:last-child {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
  }
`;
const MediaGrid = styled.div`
  @media (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-block-start: 12px;
  }
`;
const MediaPreview = styled.div<{ $variant: number }>`
  @media (max-width: 800px) {
    aspect-ratio: 1;
    border-radius: 6px;
    background: ${(props) => (props.$variant === 1 ? "linear-gradient(135deg, #236de3, #703db3)" : props.$variant === 2 ? "linear-gradient(135deg, #a7b3bc, #66747c)" : "linear-gradient(135deg, #9d8c79, #c4b59f)")};
  }
`;
const MobileRows = styled.div`
  display: none;
  @media (max-width: 800px) {
    display: block;
    margin-block-start: 10px;
    padding: 0 16px;
    background: #fff;
    text-align: start;
  }
`;
const MobileRow = styled.div`
  @media (max-width: 800px) {
    min-height: 72px;
    display: grid;
    grid-template-columns: 28px 1fr auto;
    align-items: center;
    gap: 12px;
    border-block-end: 1px solid #e9edef;
    color: #54656f;
    font-size: 17px;
    > svg {
      font-size: 22px;
    }
    > small {
      font-size: 14px;
    }
  }
`;
const Footer = styled.footer`
  padding: 20px 26px;
  border-block-start: 1px solid #d9dde0;
  background: #fff;
  text-align: end;
  @media (max-width: 800px) {
    display: none;
  }
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

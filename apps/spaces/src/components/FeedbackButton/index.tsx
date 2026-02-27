import { Button, defaultTheme, styled } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineChat } from "react-icons/md";

interface Props {}

export const FeedbackButton:FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Button 
        id="feedback-button"
        text={t("buttons.feedback")}
        type="primary"
        leftIcon={<MdOutlineChat size={28}/>}
        onClick={() => { window.open('https://shira.app/contact', '_blank') }}
        color={defaultTheme.colors.green9}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  z-index: 2;

  > button {
    font-weight: 600; 
  }
`
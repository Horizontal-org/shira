import { FunctionComponent, useState } from "react";
import { Body1, defaultTheme, styled, Link1 } from "@horizontal-org/shira-ui";
import { HookIcon } from "./assets/hook";
import { ThumbIcon } from "./assets/thumb";
import { ExplanationsHelpModal } from "../../../modals/ExplanationsHelpModal";
import { VariablesHelpModal } from "../../../modals/VariablesHelpModal";
import { useTranslation } from "react-i18next";

interface Props {
  isPhishing: boolean
}

export const CommonHeader: FunctionComponent<Props> = ({
  isPhishing
}) => {
  const { t } = useTranslation();

  const [explanationsModalOpen, setExplanationsModalOpen] = useState(false);
  const [variablesModalOpen, setVariablesModalOpen] = useState(false);

  return (
    <>
      <ExplanationsHelpModal
        isModalOpen={explanationsModalOpen}
        setIsModalOpen={setExplanationsModalOpen}
      />

      <VariablesHelpModal
        isModalOpen={variablesModalOpen}
        setIsModalOpen={setVariablesModalOpen}
      />

      <IsPhishingWrapper>
        {isPhishing ? (
          <Content>
            <HookIcon />
            <Body1>{t('create_question.tabs.content.phishing')}</Body1>
          </Content>
        ) : (
          <Content>
            <ThumbIcon />
            <Body1>{t('create_question.tabs.content.legitimate')}</Body1>
          </Content>
        )}
      </IsPhishingWrapper>
      <Body1>
        {t('create_question.tabs.content.message')}
        <Link1
          type="button"
          onClick={() => { setVariablesModalOpen(true) }}
        >
          {t('create_question.tabs.content.message_variables')}
        </Link1>{" "}
        {t('create_question.tabs.content.message2')}
        <Link1
          type="button"
          onClick={() => { setExplanationsModalOpen(true) }}
        >
          {t('create_question.tabs.content.message_explanations')}
        </Link1>{" "}
        {t('create_question.tabs.content.message3')}
      </Body1>
    </>
  )
}

const IsPhishingWrapper = styled.div`
  width: fit-content;
  margin: 12px 0;
  padding: 16px 20px;
  background: ${defaultTheme.colors.light.paleGrey};
  border-radius: 20px;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
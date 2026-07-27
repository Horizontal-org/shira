import { Body3, GeneralTooltip, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsChatRightTextFill, BsQuestionCircleFill } from "react-icons/bs";
import type { SubmissionStatus } from "../../../../../fetch/submissions";
import { SubmissionStatusPill } from "../../../../SubmissionStatusPill";

type Props = {
  status: SubmissionStatus;
  reason?: string;
};

export const SubmissionStatusBanner: FunctionComponent<Props> = ({ status, reason }) => {
  const { t } = useTranslation();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <Banner aria-label={t("templates.submission_status.title")}>

      <Heading>
        {t("templates.submission_status.title")}
        <GeneralTooltip
          enabled
          show={showHelp}
          setShow={setShowHelp}
          label={t("templates.submission_status.help_tooltip")}
        >
          <BsQuestionCircleFill size={18} color={defaultTheme.colors.dark.darkGrey} />
        </GeneralTooltip>
      </Heading>

      <Message>
        <BsChatRightTextFill size={18} color={defaultTheme.colors.blue7} />
        <Body3>{reason}</Body3>
      </Message>
      <SubmissionStatusPill status={status} variant="outlined" size="large" />

    </Banner>
  );
};

const Banner = styled.section`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
  padding: 16px 20px;
  background: ${defaultTheme.colors.light.paleGrey};
  border-radius: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
    gap: 12px;
  }
`;

const Heading = styled(Body3)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-weight: 600;
  white-space: nowrap;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;

  p {
    margin: 0;
    color: ${defaultTheme.colors.dark.darkGrey};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
`;

const Status = styled.div`
  padding: 8px 12px;
  border: 1px solid ${defaultTheme.colors.dark.lightGrey};
  border-radius: 8px;
  background: ${defaultTheme.colors.light.white};
  white-space: nowrap;
`;

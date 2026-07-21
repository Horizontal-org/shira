import { Body3, Body3Bold, defaultTheme, styled } from "@horizontal-org/shira-ui";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCalendarMonth, MdCancel, MdOutlineAccessTimeFilled, MdRemoveRedEye } from "react-icons/md";
import type { SubmissionStatus } from "../../../fetch/submissions";
import { formatLocaleDate } from "../../../language/dateUtils";

interface StatusPillProps {
  status: SubmissionStatus;
}

const statusConfig: Record<SubmissionStatus, {
  background: string;
  color: string;
  icon: ReactNode;
}> = {
  in_review: {
    background: defaultTheme.colors.light.paleGrey,
    color: defaultTheme.colors.dark.darkGrey,
    icon: <MdOutlineAccessTimeFilled size={14} color={defaultTheme.colors.dark.mediumGrey} />,
  },
  accepted: {
    background: defaultTheme.colors.light.paleGreen,
    color: defaultTheme.colors.green9,
    icon: <FaCircleCheck size={14} color={defaultTheme.colors.green6} />,
  },
  rejected: {
    background: defaultTheme.colors.light.paleRed,
    color: defaultTheme.colors.error9,
    icon: <MdCancel size={14} color={defaultTheme.colors.error7} />,
  },
};

export const SubmissionDateCell = ({ dateSubmitted, language }: { dateSubmitted: string; language?: string }) => (
  <DateCell>
    <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
    <Body3>{formatLocaleDate(dateSubmitted, language)}</Body3>
  </DateCell>
);

export const SubmissionStatusPill = ({ status }: StatusPillProps) => {
  const { t } = useTranslation();
  const config = statusConfig[status];

  return (
    <StatusPill $background={config.background} $color={config.color}>
      {config.icon}
      {t(`templates.submission_status.${status}`)}
    </StatusPill>
  );
};

export const SubmissionActionButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) => (
  <ActionButton type="button" title={label} aria-label={label} onClick={onClick}>
    <MdRemoveRedEye size={24} color={defaultTheme.colors.dark.darkGrey} />
  </ActionButton>
);

const DateCell = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const StatusPill = styled.span<{ $background: string; $color: string }>`
  background: ${(props) => props.$background};
  color: ${(props) => props.$color};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 400;
`;

const ActionButton = styled.button`
  all: unset;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const SubmissionNameCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.dark.darkGrey};
`;

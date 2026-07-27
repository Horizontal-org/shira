import { defaultTheme, styled } from "@horizontal-org/shira-ui";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck, FaRegClock } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import type { SubmissionStatus } from "../../../fetch/submissions";

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
    icon: <FaRegClock size={12} color={defaultTheme.colors.dark.darkGrey} />,
  },
  accepted: {
    background: defaultTheme.colors.light.paleGreen,
    color: defaultTheme.colors.green9,
    icon: <FaCircleCheck size={14} color={defaultTheme.colors.green6} />,
  },
  rejected: {
    background: defaultTheme.colors.light.paleRed,
    color: defaultTheme.colors.error9,
    icon: <MdCancel size={16} color={defaultTheme.colors.error7} />,
  },
};

export const SubmissionStatusPill = ({ status }: StatusPillProps) => {
  const { t } = useTranslation();
  const config = statusConfig[status];

  return (
    <StatusPill
      id={`my-submissions-status-pill-${status}`}
      $background={config.background}
      $color={config.color}
    >
      {config.icon}
      {t(`templates.submission_status.${status}`)}
    </StatusPill>
  );
};

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

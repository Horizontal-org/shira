import { defaultTheme, styled } from "@horizontal-org/shira-ui";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleCheck, FaRegClock } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import type { SubmissionStatus } from "../../fetch/submissions";

interface StatusPillProps {
  status: SubmissionStatus;
  variant?: "filled" | "outlined";
  size?: "default" | "large";
}

const statusConfig: Record<SubmissionStatus, {
  background: string;
  outlinedBackground: string;
  borderColor: string;
  color: string;
  icon: (size: number) => ReactNode;
}> = {
  in_review: {
    background: defaultTheme.colors.light.paleGrey,
    outlinedBackground: defaultTheme.colors.light.white,
    borderColor: defaultTheme.colors.dark.darkGrey,
    color: defaultTheme.colors.dark.darkGrey,
    icon: (size) => <FaRegClock size={size} color={defaultTheme.colors.dark.darkGrey} />,
  },
  approved: {
    background: defaultTheme.colors.light.paleGreen,
    outlinedBackground: defaultTheme.colors.light.paleGreen,
    borderColor: defaultTheme.colors.green8,
    color: defaultTheme.colors.green9,
    icon: (size) => <FaCircleCheck size={size} color={defaultTheme.colors.green6} />,
  },
  rejected: {
    background: defaultTheme.colors.light.paleRed,
    outlinedBackground: defaultTheme.colors.light.paleRed,
    borderColor: defaultTheme.colors.error7,
    color: defaultTheme.colors.error9,
    icon: (size) => <MdCancel size={size} color={defaultTheme.colors.error7} />,
  },
};

export const SubmissionStatusPill = ({
  status,
  variant = "filled",
  size = "default",
}: StatusPillProps) => {
  const { t } = useTranslation();
  const normalizedStatus = typeof status === "string" && status in statusConfig
    ? status as SubmissionStatus
    : "in_review";
  const config = statusConfig[normalizedStatus];
  const isLarge = size === "large";

  return (
    <StatusPill
      id={`my-submissions-status-pill-${normalizedStatus}`}
      $background={variant === "outlined" ? config.outlinedBackground : config.background}
      $borderColor={config.borderColor}
      $color={config.color}
      $variant={variant}
      $size={size}
    >
      {config.icon(isLarge ? 16 : 14)}
      {t(`templates.submission_status.${normalizedStatus}`)}
    </StatusPill>
  );
};

const StatusPill = styled.span<{
  $background: string;
  $borderColor: string;
  $color: string;
  $variant: "filled" | "outlined";
  $size: "default" | "large";
}>`
  background: ${(props) => props.$background};
  color: ${(props) => props.$color};
  display: inline-flex;
  align-items: center;
  font-weight: 400;
  line-height: 1;
  gap: ${(props) => props.$size === "large" ? "8px" : "6px"};
  padding: ${(props) => props.$size === "large" ? "8px 12px" : "4px 8px"};
  font-size: ${(props) => props.$size === "large" ? "16px" : "14px"};
  border-radius: ${(props) => props.$size === "large" ? "12px" : "2px"};
  border: ${(props) => props.$variant === "outlined" ? `1px solid ${props.$borderColor}` : "none"};
`;

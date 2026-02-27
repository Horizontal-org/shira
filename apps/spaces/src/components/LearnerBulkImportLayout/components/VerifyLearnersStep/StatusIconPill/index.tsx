import { Body4, styled, useTheme } from "@shira/ui";
import { FunctionComponent, ReactNode } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { MdOutlineQuestionMark } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

type StatusPillKind = "success" | "neutral" | "error";
type StatusIconStyle = "filled" | "plain";

interface Props {
  status: string;
  message?: string;
  label: ReactNode;
}

export const StatusIconPill: FunctionComponent<Props> = ({
  status,
  message,
  label,
}) => {
  const theme = useTheme();

  const isOk = status === "OK";
  const isMissingError = status === "Error" && !!message && message.startsWith("missing_");
  const isAlreadyRegisteredError =
    status === "Skipped" && !!message && message.includes("already_registered");

  const kind: StatusPillKind =
    (isOk || isAlreadyRegisteredError)
      ? "success"
      : isMissingError
        ? "error"
        : "neutral";

  const iconStyle: StatusIconStyle =
    isAlreadyRegisteredError
      ? "plain"
      : "filled";

  let icon: ReactNode;
  if (isOk) {
    icon = <FiCheck size={12} />;
  } else if (isMissingError) {
    icon = <MdOutlineQuestionMark size={12} />;
  } else if (isAlreadyRegisteredError) {
    icon = <IoMdPerson size={14} color={theme.colors.green6} />;
  } else {
    icon = <FiX size={12} />;
  }

  return (
    <StatusPill $kind={kind}>
      <StatusIcon $kind={kind} $style={iconStyle}>
        {icon}
      </StatusIcon>
      <Body4>{label}</Body4>
    </StatusPill>
  );
};

const StatusPill = styled.span<{ $kind: StatusPillKind }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 2px;
  font-weight: 600;
  font-size: 12px;

  color: ${({ theme, $kind }) =>
    $kind === "error"
      ? theme.colors.error9
      : $kind === "neutral"
        ? theme.colors.dark.darkGrey
        : theme.colors.green9};

  background: ${({ theme, $kind }) =>
    $kind === "error"
      ? theme.colors.light.paleRed
      : $kind === "neutral"
        ? theme.colors.light.paleGrey
        : theme.colors.light.paleGreen};
`;

const StatusIcon = styled.span<{ $kind: StatusPillKind; $style: StatusIconStyle }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: ${({ $style }) => ($style === "plain" ? "0" : "50%")};

  background: ${({ theme, $kind, $style }) =>
    $style === "plain"
      ? "transparent"
      : $kind === "success"
        ? theme.colors.green6
        : $kind === "neutral"
          ? theme.colors.dark.darkGrey
          : theme.colors.error6};

  color: ${({ theme, $style }) =>
    $style === "plain" ? theme.colors.dark.darkGrey : theme.colors.light.white};
`;

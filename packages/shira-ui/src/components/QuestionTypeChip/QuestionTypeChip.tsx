import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlinePhishing } from "react-icons/md";
import styled from "styled-components";

export type QuestionTypeChipProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "children"
> & {
  isPhishing: boolean;
  variant?: "compact" | "table";
};

export const QuestionTypeChip: FunctionComponent<QuestionTypeChipProps> = ({
  isPhishing,
  variant = "compact",
  ...props
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <StyledQuestionTypeChip
      $isPhishing={isPhishing}
      $variant={variant}
      {...props}
    >
      {isPhishing ? (
        <MdOutlinePhishing size={variant === "compact" ? 14 : 16} color={theme.colors.error9} aria-hidden />
      ) : (
        <FaCircleCheck size={variant === "compact" ? 14 : 16} color={theme.colors.green6} aria-hidden />
      )}
      {t(
        isPhishing
          ? "question_library.columns.type.phishing"
          : "question_library.columns.type.legitimate",
      )}
    </StyledQuestionTypeChip>
  );
};

const StyledQuestionTypeChip = styled.span<{
  $isPhishing: boolean;
  $variant: "compact" | "table";
}>`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: ${(props) => (props.$variant === "compact" ? "5px" : "6px")};
  min-height: ${(props) => (props.$variant === "compact" ? "24px" : "auto")};
  border-radius: 2px;
  padding: ${(props) => (props.$variant === "compact" ? "2px 8px" : "4px 8px")};
  background: ${(props) =>
    props.$isPhishing
      ? props.theme.colors.light.paleRed
      : props.theme.colors.light.paleGreen};
  color: ${(props) =>
    props.$isPhishing
      ? props.theme.colors.error9
      : props.theme.colors.green9};
  font-size: ${(props) => (props.$variant === "table" ? "14px" : "inherit")};
  font-weight: ${(props) => (props.$variant === "table" ? 400 : "inherit")};
`;

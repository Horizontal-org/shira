import {
  Button,
  QuizCard as QuizInfoCard,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FaCirclePlus, FaUserLarge } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { LibraryQuizDto } from "../../../../fetch/quiz_templates";
import { HighlightedText } from "../../../HighlightedText";
import { QuizCardTags } from "../QuizCardTags";

export interface CardProps {
  quiz: LibraryQuizDto;
  searchTerm?: string;
  onViewTemplate: () => void;
  onUseTemplate: () => void;
  onReportIssue: () => void;
}

const formatCardDate = (value: string) => {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const QuizCard: FunctionComponent<CardProps> = ({
  quiz,
  searchTerm,
  onViewTemplate,
  onUseTemplate,
  onReportIssue,
}) => {
  const { t } = useTranslation();

  const menuItems = useMemo<Array<{
    text: string;
    onClick: () => void;
    icon?: ReactElement;
  }>>(() => ([
    {
      text: t("quiz_library.view_template"),
      onClick: onViewTemplate,
      icon: <IoEyeSharp size={18} />,
    },
    {
      text: t("quiz_library.use_template"),
      onClick: onUseTemplate,
      icon: <FaCirclePlus size={14} />,
    },
    {
      text: t("quiz_library.report_issue"),
      onClick: onReportIssue,
      icon: <TbAlertTriangleFilled size={16} />,
    },
  ]), [onReportIssue, onUseTemplate, onViewTemplate, t]);

  return (
    <QuizInfoCard
      title={<HighlightedText text={quiz.title} highlight={searchTerm} />}
      languages={quiz.languages}
      menuItems={menuItems}
      onClick={onViewTemplate}
      hoverAction={(
        <UseTemplateButton
          onClick={(event) => {
            event.stopPropagation();
            onUseTemplate();
          }}
          leftIcon={<FaCirclePlus size={14} />}
          text={t("quiz_library.use_template")}
          color={defaultTheme.colors.green7}
        />
      )}
      bodyContent={<QuizCardTags tags={quiz.tags} />}
      author={quiz.author}
      createdAt={formatCardDate(quiz.createdAt)}
      authorIcon={<FaUserLarge size={14} color={defaultTheme.colors.green7} />}
      dateIcon={<MdCalendarMonth size={18} color={defaultTheme.colors.error7} />}
    />
  );
};

const UseTemplateButton = styled(Button)`
  padding: 4px 10px;
  min-height: 30px;
  white-space: nowrap;
  border-radius: 6px;

  & > div:first-child {
    margin-right: 6px;
  }

  & > span {
    font-size: 12px;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      font-size: 11px;
    }
  }
`;

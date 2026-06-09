import { Body3, Body3Bold, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { ColumnDef } from "@tanstack/react-table";
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6";
import { MdOutlinePhishing, MdRemoveRedEye } from "react-icons/md";
import { TFunction } from "i18next";
import type { App } from "../../../../fetch/question_library";
import { SelectLanguage } from "../Selects/SelectLanguage";
import { SelectApp } from "../Selects/SelectApp";
import { appIcons } from "../../../../utils/appIcons";
import { ActionButtonWithTooltip } from "../ActionButtonWithTooltip";

export type Explanation = {
  index: number;
  position: number;
  text: string;
};

export type Language = {
  id: number;
  name: string;
};

export type LanguageOption = Language & {
  content: string;
  explanations: Explanation[];
};

export type AppOption = {
  id: number;
  name: string;
  type: string;
};

export type RowType = {
  id: number;
  name: string;
  isPhishing: boolean;
  type: string;

  language: Language;
  app: App;
  content: string;
  explanations: Explanation[];

  apps: AppOption[];
  languages: LanguageOption[];

  languageSelected?: boolean;
  appSelected?: boolean;
};

type ColumnHandlers = {
  onPreview?: (q: RowType) => void;
  onAdd?: (q: RowType) => void;
  onSelectLanguage?: (questionId: number, languageId: number) => void;
  onSelectApp?: (questionId: number, appId: number) => void;
};

export const getColumns = (handlers: ColumnHandlers, t: TFunction): ColumnDef<RowType>[] => [
  {
    header: "",
    id: "rowNumber",
    cell: ({ row }) => <RowIndexCell>{row.index + 1}</RowIndexCell>,
  },
  {
    header: t("question_library.columns.question_name"),
    accessorKey: "name",
    id: "title",
    cell: (c) => <NameCell>{String(c.getValue())}</NameCell>,
  },
  {
    header: t("question_library.columns.type.title"),
    accessorKey: "isPhishing",
    id: "type",
    cell: (c) => {
      const isPhishing = Boolean(c.getValue());
      return (
        <PhishingCell
          $isPhishing={isPhishing}
        >
          {isPhishing ? (
            <MdOutlinePhishing size={16} />
          ) : (
            <FaCircleCheck size={16} color={defaultTheme.colors.green6} />
          )}
          {isPhishing ? t("question_library.columns.type.phishing") : t("question_library.columns.type.legitimate")}
        </PhishingCell>
      );
    },
  },
  {
    header: t("question_library.columns.language.title"),
    id: "language",
    cell: ({ row }) => {
      const { id, language, languages } = row.original;
      return (
        <SelectLanguage
          valueId={language?.id}
          options={languages}
          onChange={(languageId) => handlers.onSelectLanguage?.(id, languageId)}
          initiallyShowPlaceholder={languages.length > 1}
        />
      );
    },
  },
  {
    header: t("question_library.columns.app.title"),
    id: "app",
    cell: ({ row }) => {
      const { id, app, apps } = row.original;

      if (apps.length === 1) {
        return (
          <>
            <AppCell>
              {appIcons[app?.name.toLocaleLowerCase()]}
              {app?.name}
            </AppCell>
          </>
        );
      }

      return (
        <SelectApp
          valueId={app?.id}
          options={apps}
          currentType={app?.type}
          onChange={(appId) => handlers.onSelectApp?.(id, appId)}
          initiallyShowPlaceholder={apps.length > 1}
        />
      );
    },
  },
  {
    header: t("question_library.columns.actions.title"),
    id: "actions",
    cell: ({ row }) => {
      const { apps, languages, languageSelected, appSelected } = row.original;
      const hasLanguage = languageSelected ?? languages.length <= 1;
      const hasApp = appSelected ?? apps.length <= 1;
      const disableActions = !hasLanguage || !hasApp;

      const tooltipText = t("question_library.columns.actions.disabled_tooltip");
      const previewColor = disableActions
        ? defaultTheme.colors.dark.mediumGrey
        : defaultTheme.colors.dark.overlay;
      const addColor = disableActions
        ? defaultTheme.colors.dark.mediumGrey
        : defaultTheme.colors.green6;

      return (
        <ActionsCell>
          <ActionButtonWithTooltip
            id={`preview-button-${row.id}`}
            disabled={disableActions}
            tooltipText={tooltipText}
            ariaLabel={t("question_library.columns.actions.preview_aria_label")}
            title={t("question_library.columns.actions.preview_aria_label")}
            onClick={() => handlers.onPreview?.(row.original)}
          >
            <MdRemoveRedEye size={21} color={previewColor} />
          </ActionButtonWithTooltip>
          <ActionButtonWithTooltip
            id={`add-button-${row.id}`}
            disabled={disableActions}
            tooltipText={tooltipText}
            ariaLabel={t("question_library.columns.actions.add_aria_label")}
            title={t("question_library.columns.actions.add_aria_label")}
            onClick={() => handlers.onAdd?.(row.original)}
          >
            <FaCirclePlus size={18} color={addColor} />
          </ActionButtonWithTooltip>
        </ActionsCell>
      );
    },
  },
];

const PhishingCell = styled.span<{ $isPhishing?: boolean }>`
  background: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.light.paleRed
      : defaultTheme.colors.light.paleGreen)};
  color: ${(props) => (
    props.$isPhishing
      ? defaultTheme.colors.error9
      : defaultTheme.colors.green9)};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-weight: 400;
`;

const ActionsCell = styled("div")`
  display: flex;
  align-items: center;
`;

const RowIndexCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.green6};
`;

const NameCell = styled(Body3Bold)`
  color: ${defaultTheme.colors.dark.darkGrey};
`;

const AppCell = styled(Body3)`
  color: ${defaultTheme.colors.dark.darkGrey};
  font-size: 14px;
  gap: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
`;

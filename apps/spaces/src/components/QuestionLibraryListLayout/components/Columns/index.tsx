import { Body3, Body3Bold, defaultTheme, styled } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6";
import { MdOutlinePhishing, MdRemoveRedEye } from "react-icons/md";
import { TFunction } from "i18next";
import type { App } from "../../../../fetch/question_library";
import { SelectLanguage } from "../Selects/SelectLanguage";
import { SelectApp } from "../Selects/SelectApp";
import { appIcons } from "../AppIcons/appIcons";

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
};

type ColumnHandlers = {
  onPreview?: (q: RowType) => void;
  onAdd?: (q: RowType) => void;
  onSelectLanguage?: (questionId: number, languageId: number) => void;
  onSelectApp?: (questionId: number, appId: number) => void;
};

export const getColumns = (handlers: ColumnHandlers, t: TFunction): ColumnDef<RowType>[] => [
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
          initiallyShowPlaceholder={true}
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
          initiallyShowPlaceholder={true}
        />
      );
    },
  },
  {
    header: t("question_library.columns.actions.title"),
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell>
        <ActionButton
          type="button"
          name={t("question_library.tabs.preview.aria_label")}
          aria-label={t("question_library.tabs.preview.aria_label")}
          title="Preview"
          onClick={() => handlers.onPreview?.(row.original)}
        >
          <MdRemoveRedEye size={21} color={defaultTheme.colors.dark.overlay} />
        </ActionButton>
        <ActionButton
          type="button"
          name={t("question_library.columns.actions.aria_label")}
          aria-label={t("question_library.columns.actions.aria_label")}
          title="Add"
          onClick={() => handlers.onAdd?.(row.original)}
        >
          <FaCirclePlus size={18} color={defaultTheme.colors.green6} />
        </ActionButton>
      </ActionsCell>
    ),
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

const ActionButton = styled("button")`
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
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
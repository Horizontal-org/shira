import { Body3Bold, DatingAppIcon, defaultTheme, FacebookIcon, GmailIcon, OutlookIcon, SMSIcon, styled, WhatsappIcon } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6";
import { MdOutlinePhishing, MdRemoveRedEye } from "react-icons/md";
import type { App } from "../../../../fetch/question_library";

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

const appIcons: Record<string, JSX.Element> = {
  gmail: <GmailIcon />,
  messenger: <FacebookIcon />,
  sms: <SMSIcon />,
  whatsapp: <WhatsappIcon />,
  outlook: <OutlookIcon />,
  "dating app": <DatingAppIcon />,
};

export const getColumns = (handlers: ColumnHandlers): ColumnDef<RowType>[] => [
  {
    header: "Question name",
    accessorKey: "name",
    id: "title",
    cell: (c) => <NameCell>{String(c.getValue())}</NameCell>,
  },
  {
    header: "Type",
    accessorKey: "isPhishing",
    id: "type",
    cell: (c) => {
      const isPhishing = Boolean(c.getValue());
      return (
        <PhishingCell $isPhishing={isPhishing}>
          {isPhishing ? (
            <MdOutlinePhishing size={16} />
          ) : (
            <FaCircleCheck size={16} color={defaultTheme.colors.green6} />
          )}
          {isPhishing ? "Phishing" : "Legitimate"}
        </PhishingCell>
      );
    },
  },
  {
    header: "Language",
    id: "language",
    cell: ({ row }) => {
      const current = row.original.language;
      const options = row.original.languages;

      return (
        <StyledSelect
          value={String(current?.id ?? "")}
          onChange={(e) => {
            const pickedId = Number(e.target.value);
            handlers.onSelectLanguage?.(row.original.id, pickedId);
          }}
          aria-label="Select language"
        >
          {options.map((opt) => (
            <StyledOption key={opt.id} value={String(opt.id)}>
              {opt.name}
            </StyledOption>
          ))}
        </StyledSelect>
      );
    },
  },
  {
    header: "App",
    id: "app",
    cell: ({ row }) => {
      console.log("row", row);
      const current = row.original.app;
      const apps = row.original.apps;

      return (
        <AppSelectRow>
          <StyledSelect
            value={String(current?.id ?? "")}
            onChange={(e) => {
              const pickedId = Number(e.target.value);
              handlers.onSelectApp?.(row.original.id, pickedId);
            }}
            aria-label="Select app"
          >
            {apps.map((app) => (
              <StyledOption key={app.id} value={String(app.id)}>
                {app.name}
              </StyledOption>
            ))}
          </StyledSelect>
        </AppSelectRow>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      console.log("row in actions:", row),
      <ActionsCell>
        <ActionButton
          aria-label="Preview question"
          title="Preview"
          onClick={() => handlers.onPreview?.(row.original)}
        >
          <MdRemoveRedEye size={21} color={defaultTheme.colors.dark.overlay} />
        </ActionButton>
        <ActionButton
          aria-label="Add question"
          title="Add"
          onClick={() => handlers.onAdd?.(row.original)}
        >
          <FaCirclePlus size={18} color={defaultTheme.colors.green6} />
        </ActionButton>
      </ActionsCell>
    ),
  },
];

const PhishingCell = styled.div<{ $isPhishing?: boolean }>`
  background: ${(props) => (props.$isPhishing ? "#FFECEA" : "#F3F5E4")};
  color: ${(props) => (props.$isPhishing ? defaultTheme.colors.error9 : defaultTheme.colors.green9)};
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

const AppCell = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-weight: 400;
`;

const StyledSelect = styled("select")`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid ${defaultTheme.colors.light.paleGrey};
  background-color: ${defaultTheme.colors.light.paleGrey};
  color: ${defaultTheme.colors.dark.darkGrey};
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;

  &:focus {
    border-color: ${defaultTheme.colors.blue9};
    box-shadow: 0 0 0 2px ${defaultTheme.colors.blue5};
    outline: none;
  }
`;

const StyledOption = styled("option")`
  font-size: 14px;
  padding: 6px 10px;
`;

const AppSelectRow = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;
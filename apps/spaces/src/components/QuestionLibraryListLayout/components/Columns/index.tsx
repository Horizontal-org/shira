import { Body3Bold, DatingAppIcon, defaultTheme, FacebookIcon, GmailIcon, OutlookIcon, SMSIcon, styled, WhatsappIcon } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6";
import { MdOutlinePhishing, MdRemoveRedEye } from "react-icons/md";
import type { App, Language, Question as LibraryQuestion } from "../../../../fetch/question_library";
import { TableMeta } from "../..";

const appIcons: Record<string, JSX.Element> = {
  "gmail": <GmailIcon />,
  "messenger": <FacebookIcon />,
  "sms": <SMSIcon />,
  "whatsapp": <WhatsappIcon />,
  "outlook": <OutlookIcon />,
  "dating App": <DatingAppIcon />,
};

const languageOptions: Language[] = [
  { id: 1, name: 'English' },
  { id: 2, name: 'Español' },
  { id: 3, name: 'Français' },
  { id: 4, name: '普通话' },
];

export const columns: ColumnDef<LibraryQuestion>[] = [
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
          {isPhishing ? <MdOutlinePhishing size={16} /> : <FaCircleCheck size={16} color={defaultTheme.colors.green6} />}
          {isPhishing ? "Phishing" : "Legitimate"}
        </PhishingCell>
      );
    },
  },
  {
    header: "Language",
    accessorKey: "language",
    id: "language",
    cell: ({ getValue, row, table }) => {
      const language = getValue<Language>();
      const meta = table.options.meta as TableMeta;

      return (
        <StyledSelect
          value={language.id}
          onChange={(e) => {
            const picked = languageOptions.find((option) => String(option.id) === e.target.value);
            if (picked) meta.onSelect?.(row.original.id, picked.id);
          }}
          aria-label="Select language"
        >
          {languageOptions.map((option) => (
            <StyledOption key={option.id} value={String(option.id)}>
              {option.name}
            </StyledOption>
          ))}
        </StyledSelect>
      );
    },
  },
  {
    header: "App",
    accessorKey: "app",
    id: "app",
    cell: (c) => {
      const app = c.getValue() as App;
      const appName = app.name;
      return (
        <AppCell>
          {appIcons[appName.toLowerCase()]}
          {appName}
        </AppCell>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta as TableMeta | undefined;
      return (
        <ActionsCell>
          <ActionButton
            aria-label="Preview question"
            title="Preview"
            onClick={() => meta?.onPreview?.(row.original)}
          >
            <MdRemoveRedEye size={21} color={defaultTheme.colors.dark.overlay} />
          </ActionButton>
          <ActionButton
            aria-label="Add question"
            title="Add"
            onClick={() => meta?.onAdd?.(row.original)}
          >
            <FaCirclePlus size={18} color={defaultTheme.colors.green6} />
          </ActionButton>
        </ActionsCell>
      );
    }
  }
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
  outline: "none",
  "&:focus": {
    borderColor: defaultTheme.colors.blue9,
    boxShadow: 0 0 0 2px ${defaultTheme.colors.blue5},
  },
`;

const StyledOption = styled("option")`
  font-size: 14px;
  padding: 6px 10px;
`;
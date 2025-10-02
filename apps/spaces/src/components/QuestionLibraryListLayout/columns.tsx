import { Body3Bold, defaultTheme, styled } from "@shira/ui";
import { ColumnDef } from "@tanstack/react-table";
import { FaCircleCheck, FaCirclePlus } from "react-icons/fa6";
import { MdOutlinePhishing, MdRemoveRedEye } from "react-icons/md";
import type { Question as LibraryQuestion } from "../../fetch/question_library";
import { TableMeta } from ".";
import { MdFacebook, MdMail, MdTextsms } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";

const appIcons: Record<string, JSX.Element> = {
  gmail: <MdMail />,
  messenger: <MdFacebook />,
  sms: <MdTextsms />,
  whatsapp: <RiWhatsappFill />,
  outlook: <MdMail />
};

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
    cell: (c) => <Cell>{String(c.getValue())}</Cell>,
  },
  {
    header: "App",
    accessorKey: "appName",
    id: "app",
    cell: (c) => {
      const appName = String(c.getValue());
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

const Cell = styled("div")`
  font-weight: 400;
`;

const AppCell = styled("div")`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 2px;
  padding: 4px 8px;
  font-weight: 400;
`;
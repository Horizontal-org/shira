import { Body3, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FaUserLarge } from "react-icons/fa6";
import { MdCalendarMonth } from "react-icons/md";
import { PreviewDetailsCard } from "../../../PreviewModal/PreviewDetailsCard";

type Props = {
  languages: string[];
  tags: string[];
  creator: string;
  createdAt: string;
};

export const QuizPreviewDetailsCard: FunctionComponent<Props> = ({
  languages,
  tags,
  creator,
  createdAt,
}) => {
  const { t } = useTranslation();

  return (
    <PreviewDetailsCard
      languages={languages}
      tags={tags}
      sidebar={(
        <>
          <SidebarRow>
            <SectionLabel>
              <FaUserLarge size={16} color={defaultTheme.colors.green7} />
              {t("quiz_library.preview.creator")}
            </SectionLabel>
            <SidebarValue>{creator}</SidebarValue>
          </SidebarRow>

          <SidebarRow>
            <SectionLabel>
              <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
              {t("quiz_library.preview.created_on")}
            </SectionLabel>
            <SidebarValue>{createdAt}</SidebarValue>
          </SidebarRow>
        </>
      )}
    >
    </PreviewDetailsCard>
  );
};

const SectionLabel = styled(Body3)`
  display: inline-grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  column-gap: 8px;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.2;

  & > svg {
    justify-self: center;
    flex-shrink: 0;
  }
`;

const SidebarRow = styled.div`
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  align-items: center;
  column-gap: 16px;
  min-height: 32px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

const SidebarValue = styled(Body3)`
  display: flex;
  align-items: center;
  color: ${defaultTheme.colors.dark.darkGrey};
  margin: 0;
  min-height: 32px;
`;

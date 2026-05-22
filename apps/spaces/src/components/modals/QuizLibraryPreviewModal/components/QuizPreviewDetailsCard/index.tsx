import { Body3, Body4, defaultTheme, styled } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidTagAlt } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";

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
    <MetaCard>
      <MetaContent>
        <MetaSection>
          <SectionLabel>
            <IoLanguage size={24} color={defaultTheme.colors.blue6} />
            {t("quiz_library.preview.languages")}
          </SectionLabel>
          <ChipRow>
            {languages.map((language) => (
              <NeutralChip key={language}>
                <Body4>{language}</Body4>
              </NeutralChip>
            ))}
          </ChipRow>
        </MetaSection>

        {tags.length > 0 && (
          <MetaSection>
            <SectionLabel>
              <BiSolidTagAlt size={18} color={defaultTheme.colors.warning4} />
              {t("quiz_library.preview.tags")}
            </SectionLabel>
            <ChipRow>
              {tags.map((tag) => (
                <TagChip key={tag}>
                  <Body4>{tag}</Body4>
                </TagChip>
              ))}
            </ChipRow>
          </MetaSection>
        )}
      </MetaContent>

      <MetaSidebar>
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
      </MetaSidebar>
    </MetaCard>
  );
};

const MetaCard = styled.div`
  margin-top: 28px;
  border: 1px solid ${defaultTheme.colors.light.paleGrey};
  border-radius: 20px;
  padding: 16px 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 32px;
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const MetaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MetaSection = styled.div`
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  align-items: start;
  gap: 12px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const SectionLabel = styled(Body3)`
  display: inline-flex;
  gap: 4px;
  text-transform: uppercase;
`;

const LabelIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  line-height: 1;
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 1px;
`;

const NeutralChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${defaultTheme.colors.light.paleGrey};
  color: ${defaultTheme.colors.dark.darkGrey};
  line-height: 1;
`;

const TagChip = styled(NeutralChip)`
  border: 1px solid ${defaultTheme.colors.blue4};
  background: ${defaultTheme.colors.light.white};
  color: ${defaultTheme.colors.blue7};
`;

const MetaSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 2px;
`;

const SidebarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 28px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
`;

const SidebarValue = styled(Body3)`
  color: ${defaultTheme.colors.dark.darkGrey};
  margin: 0;
`;

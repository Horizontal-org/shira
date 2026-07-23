import { Body3, Body4, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BiSolidTagAlt } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";

type Props = {
  children?: ReactNode;
  sidebar: ReactNode;
  languages: string[];
  tags?: string[];
};

export const PreviewDetailsCard: FunctionComponent<Props> = ({
  children,
  sidebar,
  languages,
  tags = [],
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Main>

        <MetadataRow>
          <Label>
            <IoLanguage size={18} color={defaultTheme.colors.blue6} />
            {t("quiz_library.preview.languages")}
          </Label>
          <ChipRow>
            {languages.map((language) => (
              <NeutralChip key={language}>
                <Body4>{language}</Body4>
              </NeutralChip>
            ))}
          </ChipRow>
        </MetadataRow>

        {children && (
          <MetadataRow>
            {children}
          </MetadataRow>
        )}

        {tags.length > 0 && (
          <MetadataRow>
            <Label>
              <BiSolidTagAlt size={16} color={defaultTheme.colors.warning4} />
              {t("quiz_library.preview.tags")}
            </Label>
            <ChipRow>
              {tags.map((tag) => (
                <TagChip key={tag}><Body4>{tag}</Body4></TagChip>
              ))}
            </ChipRow>
          </MetadataRow>
        )}
      </Main>

      <Sidebar>{sidebar}</Sidebar>
    </Card>
  );
};

const Card = styled.div`
  margin-top: 28px;
  border: 1px solid ${defaultTheme.colors.light.paleGrey};
  border-radius: 20px;
  padding: 16px 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 32px;
  align-items: start;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Main = styled.div`
  display: grid;
  gap: 12px;
`;

const Sidebar = styled.div`
  display: grid;
  gap: 12px;
  align-content: start;
`;

const MetadataRow = styled.div`
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  align-items: center;
  column-gap: 12px;
  row-gap: 8px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const Label = styled(Body3)`
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

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  min-height: 32px;
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

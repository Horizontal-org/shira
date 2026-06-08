import { BaseFloatingMenu, Body4, styled, defaultTheme, Body1SemiBold, Button } from '@horizontal-org/shira-ui';
import { FunctionComponent, useRef, useState } from 'react';
import { LibraryQuizDto } from '../../../../fetch/quiz_templates';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdCalendarMonth } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { TbAlertTriangleFilled } from 'react-icons/tb';
import { IoEyeSharp } from 'react-icons/io5';
import { FaCirclePlus, FaUserLarge } from 'react-icons/fa6';
import { QuizCardTags } from '../QuizCardTags';

export interface CardProps {
  quiz: LibraryQuizDto;
  searchTerm?: string;
  onViewTemplate: () => void;
  onUseTemplate: () => void;
  onReportIssue: () => void;
}

const renderHighlightedTitle = (title: string, searchTerm?: string) => {
  const normalizedSearchTerm = searchTerm?.trim();

  if (!normalizedSearchTerm) {
    return title;
  }

  const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(${escapeRegExp(normalizedSearchTerm)})`, 'ig'); // (i = case-insensitive, g = global)
  const parts = title.split(pattern);

  return parts.map((part, index) => {
    if (part.toLowerCase() !== normalizedSearchTerm.toLowerCase()) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    return (
      <TitleHighlight key={`${part}-${index}`}>
        {part}
      </TitleHighlight>
    );
  });
};

const formatCardDate = (value: string) => {
  return new Date(value)
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <CardWrapper>
      <TopSection>
        <HeaderSection>
          <HeaderRow>
            <LanguageTemplateRow>
              {quiz.languages.map((language) => (
                <LanguageChip key={language}>
                  <Body4>{language}</Body4>
                </LanguageChip>
              ))}
            </LanguageTemplateRow>
          </HeaderRow>

          <SmallUseTemplateButton
            onClick={(event) => {
              event.stopPropagation();
              onUseTemplate();
            }}
            leftIcon={<FaCirclePlus size={12} />}
            text={t('quiz_library.use_template')}
            color={defaultTheme.colors.green7}
          />

          <MenuButton
            ref={menuButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
          >
            <BsThreeDotsVertical size={20} color={defaultTheme.colors.green7} />
          </MenuButton>

          <BaseFloatingMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            anchorEl={menuButtonRef.current}
            width={220}
            elements={[
              {
                text: t('quiz_library.view_template'),
                onClick: (event) => {
                  event.stopPropagation();
                  setIsMenuOpen(false);
                  onViewTemplate();
                },
                icon: <IoEyeSharp color={defaultTheme.colors.dark.darkGrey} />
              },
              {
                text: t('quiz_library.use_template'),
                onClick: (event) => {
                  event.stopPropagation();
                  setIsMenuOpen(false);
                  onUseTemplate();
                },
                icon: <FaCirclePlus color={defaultTheme.colors.green7} />
              },
              {
                text: t('quiz_library.report_issue'),
                onClick: (event) => {
                  event.stopPropagation();
                  setIsMenuOpen(false);
                  onReportIssue();
                },
                icon: <TbAlertTriangleFilled color={defaultTheme.colors.error7} />
              }
            ]}
          />
        </HeaderSection>

        <CardBody>
          <CardTitle>{renderHighlightedTitle(quiz.title, searchTerm)}</CardTitle>
          <QuizCardTags tags={quiz.tags} />
        </CardBody>
      </TopSection>

      <Footer>
        <FooterMeta>
          <FooterItem>
            <FaUserLarge size={14} color={defaultTheme.colors.green7} />
            <ModifiedText>{quiz.author}</ModifiedText>
          </FooterItem>

          <FooterItem>
            <MdCalendarMonth size={18} color={defaultTheme.colors.error7} />
            <ModifiedText>{formatCardDate(quiz.createdAt)}</ModifiedText>
          </FooterItem>
        </FooterMeta>
      </Footer>
    </CardWrapper>
  );
};

const SmallUseTemplateButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 32px;
  z-index: 2;
  padding: 4px 10px;
  white-space: nowrap;
  min-height: 30px;

  & > div:first-child {
    margin-right: 6px;
  }

  & > span {
    font-size: 12px;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 11px;
    }
  }
`;

const CardWrapper = styled.div`
  background: ${props => props.theme.colors.light.white};
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 172px;

  @media (hover: hover) and (pointer: fine) {
    ${SmallUseTemplateButton} {
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }

    &:hover ${SmallUseTemplateButton},
    &:focus-within ${SmallUseTemplateButton} {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  flex: 1;
`;

const HeaderSection = styled.div`
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  padding-right: 24px;
`;

const LanguageTemplateRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  white-space: nowrap;
  flex: 0 0 auto;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const LanguageChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border-radius: 2px;
  background: ${props => props.theme.colors.light.paleGrey};
  color: ${props => props.theme.colors.dark.darkGrey};
  line-height: 1;
`;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-height: 116px;
`;

const CardTitle = styled(Body1SemiBold)`
  color: ${props => props.theme.colors.dark.darkGrey};
  line-height: 1.35;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 20px;
  }
`;

const TitleHighlight = styled.mark`
  background: ${props => props.theme.colors.warning1};
  padding: 0 1px;
`;

const ModifiedText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
  margin: 0;
`;

const Footer = styled.div`
  background: ${props => props.theme.colors.light.paleGreen};
  padding: 7px 20px;
`;

const FooterMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

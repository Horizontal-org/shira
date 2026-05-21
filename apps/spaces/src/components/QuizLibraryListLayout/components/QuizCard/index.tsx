import { ActionTooltip, BaseFloatingMenu, Body3, Body4, styled, SubHeading3, defaultTheme, Body1, Body1SemiBold } from '@shira/ui';
import { FunctionComponent, useRef, useState } from 'react';
import { LibraryQuizDto } from '../../../../fetch/quiz_library';
import { FaCirclePlus } from 'react-icons/fa6';
import { FiEye } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { TbAlertTriangleFilled } from 'react-icons/tb';

export interface CardProps {
  quiz: LibraryQuizDto;
  onViewTemplate: () => void;
  onReportIssue: () => void;
  showLoading?: boolean;
}

const formatCardDate = (value: string) => {
  return new Date(value)
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    .toUpperCase();
};

export const QuizCard: FunctionComponent<CardProps> = ({
  quiz,
  onViewTemplate,
  onReportIssue,
}) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <CardWrapper>
      <TopSection>
        <HeaderRow>
          <LanguageRow>
            {quiz.languages.map((language) => (
              <LanguageChip key={language}>
                <Body4>{language}</Body4>
              </LanguageChip>
            ))}
          </LanguageRow>

          <ActionTooltip
            content={t('quiz_library.actions_tooltip')}
            disabled={isMenuOpen}
            delayMs={50}
          >
            <MenuButton
              ref={menuButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <FaCirclePlus size={18} color={defaultTheme.colors.green7} />
            </MenuButton>
          </ActionTooltip>

          <BaseFloatingMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            anchorEl={menuButtonRef.current}
            width={170}
            elements={[
              {
                text: t('quiz_library.view_template'),
                onClick: (event) => {
                  event.stopPropagation();
                  setIsMenuOpen(false);
                  onViewTemplate();
                },
                icon: <FiEye color={defaultTheme.colors.dark.darkGrey} />
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
        </HeaderRow>

        <CardTitle>{quiz.title}</CardTitle>
      </TopSection>

      <BottomContainer>
        <ModifiedText>{[quiz.author.toLocaleUpperCase(), formatCardDate(quiz.createdAt)].join(' | ')}</ModifiedText>
        <TagRow>
          {quiz.tags.map((tag) => (
            <TagChip key={tag}>
              <Body4>{tag}</Body4>
            </TagChip>
          ))}
        </TagRow>
      </BottomContainer>

    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background: white;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 28px 0;
  gap: 12px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const LanguageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0;
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

const CardTitle = styled(Body1SemiBold)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const ModifiedText = styled(Body3)`
  color: ${props => props.theme.colors.green7};
  margin: 0;
  letter-spacing: 0.04em;
  line-height: 1.4;
`;

const BottomContainer = styled.div`
  margin-top: 10px;
  padding: 14px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DescriptionText = styled(Body3)`
  margin: 0;
  color: ${props => props.theme.colors.dark.darkGrey};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: ${props => props.theme.colors.blue7};
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border: 1px solid ${props => props.theme.colors.blue4};
  border-radius: 4px;
  background: white;
  line-height: 1;
`;

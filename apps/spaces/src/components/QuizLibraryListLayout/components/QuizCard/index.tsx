import { BaseFloatingMenu, Body3, Body4, styled, defaultTheme, Body1SemiBold } from '@shira/ui';
import { FunctionComponent, useRef, useState } from 'react';
import { LibraryQuizDto } from '../../../../fetch/quiz_library';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiMiniUser } from 'react-icons/hi2';
import { MdCalendarMonth } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { TbAlertTriangleFilled } from 'react-icons/tb';
import { IoEyeSharp } from 'react-icons/io5';
import { FaCirclePlus, FaUserLarge } from 'react-icons/fa6';

export interface CardProps {
  quiz: LibraryQuizDto;
  onViewTemplate: () => void;
  onUseTemplate: () => void;
  onReportIssue: () => void;
}

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
        <HeaderRow>
          <LanguageRow>
            {quiz.languages.map((language) => (
              <LanguageChip key={language}>
                <Body4>{language}</Body4>
              </LanguageChip>
            ))}
          </LanguageRow>

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
        </HeaderRow>

        <CardBody>
          <CardTitle>{quiz.title}</CardTitle>

          <TagRow>
            {quiz.tags.map((tag) => (
              <TagChip key={tag}>
                <Body4>{tag}</Body4>
              </TagChip>
            ))}
          </TagRow>
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

const CardWrapper = styled.div`
  background: ${props => props.theme.colors.light.white};
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px 28px 24px;
  flex: 1;
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
  gap: 25px;
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

const ModifiedText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
  margin: 0;
`;

const Footer = styled.div`
  background: ${props => props.theme.colors.light.paleGreen};
  padding: 10px 20px;
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

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: ${props => props.theme.colors.blue7};
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 4px 4px 4px;
  border: 1px solid ${props => props.theme.colors.blue4};
  border-radius: 2px;
  background: ${props => props.theme.colors.light.white};
  line-height: 1;
`;

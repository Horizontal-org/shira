import { Body3, Body4, styled, SubHeading3 } from '@shira/ui';
import { FunctionComponent } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { LibraryQuizDto } from '../../../../fetch/quiz_library';

export interface CardProps {
  quiz: LibraryQuizDto;
  onMenuClick: () => void;
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
  onMenuClick,
}) => {
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
            type="button"
            aria-label="Quiz actions"
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick();
            }}
          >
            <BsThreeDotsVertical size={18} />
          </MenuButton>
        </HeaderRow>

        <CardTitle>{quiz.title}</CardTitle>
        <ModifiedText>{[quiz.author.toLocaleUpperCase(), formatCardDate(quiz.createdAt)].join(' | ')}</ModifiedText>
      </TopSection>

      {quiz.description && (
        <BottomContainer>
          <DescriptionText>{quiz.description}</DescriptionText>
          <TagRow>
            {quiz.tags.map((tag) => (
              <TagChip key={tag}>
                <Body4>{tag}</Body4>
              </TagChip>
            ))}
          </TagRow>
        </BottomContainer>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background: white;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 320px;
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

const CardTitle = styled(SubHeading3)`
  margin: 0;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const ModifiedText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
  margin: 0;
  letter-spacing: 0.04em;
  line-height: 1.4;
`;

const BottomContainer = styled.div`
  margin-top: auto;
  padding: 14px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

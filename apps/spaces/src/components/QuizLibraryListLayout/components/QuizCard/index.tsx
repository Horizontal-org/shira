import { Body3, Body4, styled, SubHeading3 } from '@shira/ui';
import { FunctionComponent, useRef, useState } from 'react';

export interface CardProps {
  id?: string;
  title: string;
  createdAt: string;
  author: string;
  description?: string;
  onCardClick: () => void;
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
  id,
  title,
  createdAt,
  author,
  description,
  onCardClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <CardWrapper id={id} onClick={() => {
      onCardClick()
    }}>
      <TopSection>
        <HeaderRow>
          <MenuButton
            ref={menuButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
          </MenuButton>
        </HeaderRow>

        <CardTitle>{title}</CardTitle>
        <ModifiedText>{[author.toLocaleUpperCase(), formatCardDate(createdAt)].join(' | ')}</ModifiedText>
      </TopSection>

      {description && (
        <BottomContainer>
          <DescriptionText>{description}</DescriptionText>
        </BottomContainer>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 300px;
  min-height: 244px;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    max-width: 100%;
  }
`;

const ActionLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  z-index: 1;
`;

const ActionLoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ActionLoadingText = styled(Body4)`
  color: ${props => props.theme.colors.dark.darkGrey};
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0;
  gap: 10px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.dark.darkGrey};
  
  &:hover {
    color: ${props => props.theme.colors.dark.black};
  }
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
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.4;
`;

const BottomContainer = styled.div`
  margin-top: auto;
  padding: 12px 24px 24px;
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

import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import {
  Card,
  CardChip,
  CardFooter,
  CardFooterItem,
  CardFooterMeta,
  CardFooterText,
  type CardMenuItem,
} from './Card';
import { Body4 } from '../Typography';

export interface QuizCardProps {
  id?: string;
  title: ReactNode;
  languages?: string[];
  bodyContent?: ReactNode;
  author: ReactNode;
  createdAt: ReactNode;
  menuItems?: CardMenuItem[];
  hoverAction?: ReactNode;
  onClick?: () => void;
  showLoading?: boolean;
  loadingLabel?: string;
  minHeight?: string;
  authorIcon?: ReactNode;
  dateIcon?: ReactNode;
}

export const QuizCard: FunctionComponent<QuizCardProps> = ({
  id,
  title,
  languages = [],
  bodyContent,
  author,
  createdAt,
  menuItems = [],
  hoverAction,
  onClick,
  showLoading = false,
  loadingLabel,
  minHeight = '172px',
  authorIcon,
  dateIcon,
}) => {
  return (
    <Card
      id={id}
      title={title}
      bodyContent={bodyContent}
      menuItems={menuItems}
      hoverAction={hoverAction}
      onClick={onClick}
      showLoading={showLoading}
      loadingLabel={loadingLabel}
      minHeight={minHeight}
      headerContent={languages.length > 0 ? (
        <LanguageRow>
          {languages.map((language) => (
            <CardChip key={language}>
              <Body4>{language}</Body4>
            </CardChip>
          ))}
        </LanguageRow>
      ) : undefined}
      footerContent={(
        <CardFooter>
          <CardFooterMeta>
            <CardFooterItem>
              {authorIcon}
              <CardFooterText>{author}</CardFooterText>
            </CardFooterItem>

            <CardFooterItem>
              {dateIcon}
              <CardFooterText>{createdAt}</CardFooterText>
            </CardFooterItem>
          </CardFooterMeta>
        </CardFooter>
      )}
    />
  );
};

const LanguageRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  min-width: 0;
  white-space: nowrap;
`;

import { FunctionComponent } from "react";
import { styled } from '@horizontal-org/shira-ui'

import { useTranslation } from "react-i18next";

const icons = {
  'human-resources': '✊🏽',
  'activist': '📢',
  'journalism-and-media': '🗒️',
  'business': '💼',
  'services': '☕',
  'education': '🏫',
  'healthcare': '💊',
  'marketing': '📢',
  'arts-and-culture': '🎨',
  'human-rights': '✊🏽',
  'general': '🌐'
}

const getIcon = (slug: string) => {
  return icons[slug]
}

interface Props {
  id?: string;
  name: string;
  slug: string;
  selected: boolean;
  onClick?: () => void
}

export const WorkFieldItem: FunctionComponent<Props> = ({
  selected,
  slug,
  onClick
}) => {
  const { t } = useTranslation();

  return (
    <Box selected={selected} onClick={onClick}>
      <div>{getIcon(slug)}</div>
      <span>{t(`setup.fields_of_work.items.${slug}`)}</span>
    </Box>
  )
};

interface BoxProps {
  selected: boolean;
}

const Box = styled.div<BoxProps>`
  width: 80%;
  background: ${props => props.theme.colors.light.white};
  border: 1px solid ${props => props.theme.colors.dark.mediumGrey};
  border-radius: 100px;
  cursor: pointer;
  display: flex;  
  align-items: center;;
  padding: 16px 20px;
  margin-bottom: 12px;

  > div {
    display: flex;
    jiustify-content: center;
    font-size: 21px;
  } 

  > span {
    font-size: 16px;
    line-height: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.64);
    padding-left: 8px;
  }

  ${props => props.selected && `
    background: ${props.theme.colors.green2};
  `}

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    width: 100%;
    margin-right: 0;
  }
`;

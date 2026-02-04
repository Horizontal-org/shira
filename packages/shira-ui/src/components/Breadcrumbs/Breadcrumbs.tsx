import styled, { useTheme } from 'styled-components';
import { Body2SemiBold } from '../Typography';
import { FaChevronRight } from "react-icons/fa6";

interface BreadcrumbProps {
  text: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbProps[];
  active: number
}

export const Breadcrumbs = ({ items, active }: BreadcrumbsProps) => {
  const theme = useTheme();

  return (
    <StyledWrapper>
      {items.map((i, k) => (
        <>
          <Breadcrumb $active={active === k}>
            <Position>{k + 1}</Position>
            <Body2SemiBold>
              {i.text}
            </Body2SemiBold>
          </Breadcrumb>
          {k < items.length - 1 && (
            <Chevron>
              <FaChevronRight
                color={theme.colors.green6}
              />
            </Chevron>
          )}
        </>
      ))}
    </StyledWrapper>
  );
};

interface StyledBreadcrumbProps {
  $active: boolean;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
`;

const Breadcrumb = styled.div<StyledBreadcrumbProps>`
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 4px solid transparent;
  color: ${props => props.theme.colors.dark.darkGrey};

  ${props => props.$active && `
    color: ${props.theme.colors.green7};
    border-bottom: 4px solid ${props.theme.colors.green7};

    > div {
      background: ${props.theme.colors.green7};
    }
  `}
`

const Position = styled.div`
  background: ${props => props.theme.colors.dark.darkGrey};
  height: 24px;
  min-height: 24px;
  width: 24px;
  border-radius: 50%;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  margin-right: 8px;
`

const Chevron = styled.div`
  margin: 0 20px;
`

export default Breadcrumbs;
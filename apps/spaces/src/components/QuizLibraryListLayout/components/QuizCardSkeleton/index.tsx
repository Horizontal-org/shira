import { FunctionComponent } from "react";
import { styled } from "@horizontal-org/shira-ui";
import { DEFAULT_PAGE_LIMIT } from "../../../../fetch/quiz_templates";

export const QuizCardSkeleton: FunctionComponent = () => {
  return (
    <SkeletonLayout aria-hidden="true">
      <CardGrid>
        {Array.from({ length: DEFAULT_PAGE_LIMIT }, (_, index) => (
          <CardWrapper key={`quiz-library-skeleton-${index}`} />
        ))}
      </CardGrid>
    </SkeletonLayout>
  );
};

const SkeletonLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SkeletonBlock = styled.div`
  background: ${(props) => props.theme.colors.light.white};
`;

const CardGrid = styled.div`
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: stretch;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled(SkeletonBlock)`
  border-radius: 24px;
  width: 100%;
  min-height: 172px;
`;

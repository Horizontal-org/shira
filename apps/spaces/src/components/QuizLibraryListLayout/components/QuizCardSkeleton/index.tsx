import { FunctionComponent } from "react";
import { styled } from "@horizontal-org/shira-ui";
import { DEFAULT_PAGE_LIMIT } from "../../../../fetch/quiz_templates";

type Props = {
  showToolbar?: boolean;
};

export const QuizCardSkeleton: FunctionComponent<Props> = ({
  showToolbar = true,
}) => {
  return (
    <SkeletonLayout aria-hidden="true">
      {showToolbar && (
        <ToolbarRow>
          <SearchSkeleton />

          <ActionsRow>
            <SortSkeleton />
            <FilterSkeleton />
          </ActionsRow>
        </ToolbarRow>
      )}

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

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 12px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SkeletonBlock = styled.div`
  background: ${(props) => props.theme.colors.light.white};
`;

const SearchSkeleton = styled(SkeletonBlock)`
  width: 100%;
  max-width: 632px;
  height: 46px;
  border-radius: 999px;
`;

const SortSkeleton = styled(SkeletonBlock)`
  width: 250px;
  height: 46px;
  border-radius: 999px;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex: 1 1 auto;
    width: auto;
  }
`;

const FilterSkeleton = styled(SkeletonBlock)`
  width: 114px;
  height: 46px;
  border-radius: 999px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }
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

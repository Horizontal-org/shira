import { FunctionComponent } from 'react';
import { styled } from '@shira/ui';

export const QuizCardSkeleton: FunctionComponent = () => {
  return (
    <CardWrapper aria-hidden="true">
      <TopSection>
        <HeaderRow>
          <LanguageRow>
            <SkeletonBlock $width="72px" $height="24px" $radius="4px" />
            <SkeletonBlock $width="58px" $height="24px" $radius="4px" />
          </LanguageRow>

          <SkeletonBlock $width="18px" $height="18px" $radius="999px" />
        </HeaderRow>

        <TitleSkeleton>
          <SkeletonBlock $width="88%" $height="20px" />
          <SkeletonBlock $width="64%" $height="20px" />
        </TitleSkeleton>
      </TopSection>

      <BottomContainer>
        <SkeletonBlock $width="70%" $height="16px" />
        <TagRow>
          <SkeletonBlock $width="68px" $height="24px" $radius="4px" />
          <SkeletonBlock $width="84px" $height="24px" $radius="4px" />
          <SkeletonBlock $width="60px" $height="24px" $radius="4px" />
        </TagRow>
      </BottomContainer>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background: ${props => props.theme.colors.light.white};
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

const BottomContainer = styled.div`
  margin-top: 10px;
  padding: 14px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TitleSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonBlock = styled.div<{ $width: string; $height: string; $radius?: string }>`
  width: ${props => props.$width};
  height: ${props => props.$height};
  border-radius: ${props => props.$radius ?? "8px"};
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.light.paleGrey} 0%,
    ${props => props.theme.colors.light.white} 50%,
    ${props => props.theme.colors.light.paleGrey} 100%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 1.4s ease-in-out infinite;

  @keyframes skeletonShimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
`;

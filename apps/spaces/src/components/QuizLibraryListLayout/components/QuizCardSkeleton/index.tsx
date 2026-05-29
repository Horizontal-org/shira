import { FunctionComponent } from 'react';
import { styled } from '@horizontal-org/shira-ui';

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

        <CardBody>
          <TitleSkeleton>
            <SkeletonBlock $width="88%" $height="26px" />
            <SkeletonBlock $width="78%" $height="26px" />
            <SkeletonBlock $width="54%" $height="26px" />
          </TitleSkeleton>

          <TagRow>
            <SkeletonBlock $width="152px" $height="40px" $radius="4px" />
            <SkeletonBlock $width="132px" $height="40px" $radius="4px" />
          </TagRow>
        </CardBody>
      </TopSection>

      <Footer>
        <FooterMeta>
          <FooterItem>
            <SkeletonBlock $width="24px" $height="24px" $radius="999px" />
            <SkeletonBlock $width="120px" $height="18px" />
          </FooterItem>

          <FooterItem>
            <SkeletonBlock $width="24px" $height="24px" $radius="999px" />
            <SkeletonBlock $width="110px" $height="18px" />
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
  padding: 28px 28px 24px;
  gap: 20px;
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

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  flex: 1;
  min-height: 220px;
`;

const Footer = styled.div`
  background: ${props => props.theme.colors.light.paleGreen};
  padding: 16px 28px;
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
  gap: 12px;
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

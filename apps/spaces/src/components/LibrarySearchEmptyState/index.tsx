import { EmptyState, defaultTheme, styled } from "@horizontal-org/shira-ui";
import { FunctionComponent } from "react";

type Props = {
  title: string;
  subtitle: string;
};

export const LibrarySearchEmptyState: FunctionComponent<Props> = ({
  title,
  subtitle,
}) => {
  return (
    <Wrapper>
      <EmptyState
        subtitle={
          <Content>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </Content>
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: clamp(280px, calc(100vh - 360px), 540px);
  padding: 24px 16px 32px;
  overflow: hidden;

  & svg {
    width: min(240px, 28vw);
    height: auto;
    max-height: 220px;
    flex-shrink: 1;
  }
`;

const Content = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.span`
  margin: 0 0 12px;
  color: ${defaultTheme.colors.dark.black};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
`;

const Subtitle = styled.span`
  max-width: 560px;
  margin: 0;
  color: ${defaultTheme.colors.dark.darkGrey};
  font-size: 18px;
  font-weight: 300;
  line-height: 1.5;
`;

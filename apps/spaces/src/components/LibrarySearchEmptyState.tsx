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
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 540px;
  padding: 48px 16px 72px;
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

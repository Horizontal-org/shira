import {
  Body1,
  CloseButton,
  FullScreenModal,
  H2,
  defaultTheme,
  styled,
} from "@horizontal-org/shira-ui";
import { FunctionComponent, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  details?: ReactNode;
  children?: ReactNode;
  fullScreenContent?: ReactNode;
};

export const QuizPreviewModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  actions,
  details,
  children,
  fullScreenContent,
}) => (
  <FullScreenModal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick
  >
    {fullScreenContent ?? (
      <>
        <TopBar>
          <CloseButton onClick={onClose} />
          {actions && <Actions>{actions}</Actions>}
        </TopBar>

        <Content>
          <H2>{title}</H2>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
          {details}
          {children}
        </Content>
      </>
    )}
  </FullScreenModal>
);

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 28px 0;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px 20px 0;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  padding: 32px 64px 72px;
  overflow-y: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    padding: 24px 20px 56px;
  }
`;

const Subtitle = styled(Body1)`
  margin: 16px 0 0;
  color: ${defaultTheme.colors.dark.darkGrey};
`;

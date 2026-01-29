import { Body3, Form, styled } from "@shira/ui";
import backgroundSvg from "../../assets/Background.svg";

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 16px;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledForm = styled(Form)`
  position: relative;
  z-index: 1;
`;

export const BackgroundPattern = styled.div`
  background-image: url(${backgroundSvg});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InlineErrorMessage = styled.div`
  color: ${props => props.theme.colors.red7};
`;

export const SuccessInfo = styled(Body3)`
  margin-top: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;

    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const BackLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

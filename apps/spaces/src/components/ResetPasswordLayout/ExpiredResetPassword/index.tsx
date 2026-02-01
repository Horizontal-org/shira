import { FunctionComponent } from "react";
import { Body1, Button, H2, styled } from "@shira/ui";
import notFoundSvg from "../../../assets/404.svg";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  onRequestNewLink: () => void;
}

export const ExpiredResetPassword: FunctionComponent<Props> = ({
  title,
  description,
  buttonText,
  onRequestNewLink,
}) => {
  return (
    <ExpiredContent>
      <ExpiredLeft>
        <ExpiredHeader>
          <H2>{title}</H2>
          <Body1>{description}</Body1>
        </ExpiredHeader>
        <ExpiredButtonContainer>
          <Button text={buttonText} type="outline" onClick={onRequestNewLink} />
        </ExpiredButtonContainer>
      </ExpiredLeft>
      <ExpiredRight>
        <ExpiredImage src={notFoundSvg} alt={title} />
      </ExpiredRight>
    </ExpiredContent>
  );
};

const ExpiredContent = styled.div`
  z-index: 1;
  width: 1120px;
  display: flex;
  gap: 60px;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 32px;
    text-align: center;
    padding: 20px 0;
  }
`;

const ExpiredLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  text-align: left;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    text-align: center;
  }
`;

const ExpiredHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ExpiredRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExpiredImage = styled.img`
  max-width: 420px;
  width: 100%;
  height: auto;
`;

const ExpiredButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    justify-content: center;
    width: 100%;

    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

import { Body1SemiBold, Form, styled } from "@shira/ui";
import { FunctionComponent } from "react";

interface Props {}

export const GetStartedSuccess: FunctionComponent<Props> = () => {
  return (
    <StyledForm
      title="Almost there!"
      description="To complete the process, please open the email we sent to your email address and click on the link to create your Shira space."
    >
      <Body1SemiBold>
        Didn’t receive an email? If it’s not in your spam folder, please contact us at <Contact>contact@wearehorizontal.org</Contact>
      </Body1SemiBold>
    </StyledForm>
  );
};


const StyledForm = styled(Form)`
  position: relative;
  z-index:1;
  text-align: left;
  margin-bottom: 32px;
  gap: 16px;
`;


const Contact = styled.a`
  color: ${props => props.theme.colors.blue6};
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
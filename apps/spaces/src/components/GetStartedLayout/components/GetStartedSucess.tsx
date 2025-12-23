import { Body2Regular, Form, styled } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const GetStartedSuccess: FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  return (
    <StyledForm
      title={t('get_started.success.title')}
      description={t('get_started.success.description')}
    >
      <Body2Regular>
        {t('get_started.success.didnt_receive')}{' '}
        <Contact href="mailto:contact@wearehorizontal.org">contact@wearehorizontal.org</Contact>
      </Body2Regular>
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
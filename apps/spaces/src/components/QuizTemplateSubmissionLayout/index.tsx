import { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Body1,
  Body2Regular,
  Body3,
  Button,
  Checkbox,
  CloseButton,
  defaultTheme,
  FilterSelect,
  Link1,
  Link3,
  Logo,
  styled,
  SubHeading1,
  SubHeading3,
  TextInput,
} from "@horizontal-org/shira-ui";
import { IoLanguage } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { BiSolidTag } from "react-icons/bi";
import { Trans, useTranslation } from "react-i18next";
import {
  getQuizTemplateLanguageOptions,
  getQuizTemplateTagOptions,
  type QuizTemplateFilterOption,
} from "../../fetch/quiz_templates";

type LocationState = { quizTitle?: string };

export const QuizTemplateSubmissionLayout: FunctionComponent = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as { state?: LocationState };
  const { t } = useTranslation();

  const [name, setName] = useState(location.state?.quizTitle ?? "");
  const [description, setDescription] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [languageOptions, setLanguageOptions] = useState<QuizTemplateFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<QuizTemplateFilterOption[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      const [nextLanguages, nextTags] = await Promise.all([
        getQuizTemplateLanguageOptions(),
        getQuizTemplateTagOptions(),
      ]);
      setLanguageOptions(nextLanguages);
      setTagOptions(nextTags);
    };

    loadOptions();
  }, []);

  const canSubmit = Boolean(
    quizId
    && name.trim()
    && description.trim()
    && languages.length
    && tags.length
    && acceptedTerms,
  );

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <LogoFrame><Logo /></LogoFrame>
          <CloseButton
            aria-label={t("templates.submit_quiz.header_title")}
            iconSize={22}
            onClick={() => navigate(-1)}
          />
          <Body2Regular>{t("templates.submit_quiz.header_title")}</Body2Regular>
        </HeaderLeft>
        <Button
          disabled={!canSubmit}
          id="submit-quiz-template-button"
          onClick={() => undefined}
          rightIcon={<FiChevronRight size={16} />}
          text={t("templates.submit_quiz.submit")}
          type="primary"
        />
      </Header>

      <Content>
        <FormCard>
          <SubHeading1>{t("templates.submit_quiz.title")}</SubHeading1>
          <Subtitle>
            <Body1>{t("templates.submit_quiz.intro")}</Body1>
            <Body1>
              <Trans
                i18nKey="templates.submit_quiz.review_notice"
                components={{ learnMore: <Link1 href="/support" /> }}
              />
            </Body1>
          </Subtitle>

          <Field>
            <FieldTitle>{t("templates.submit_quiz.name")}</FieldTitle>
            <Body3>{t("templates.submit_quiz.name_hint")}</Body3>
            <TextInput
              id="quiz-template-name"
              onChange={(e) => setName(e.target.value)}
              placeholder={t("templates.submit_quiz.name_placeholder")}
              required
              value={name}
            />
          </Field>

          <Field>
            <FieldTitle>{t("templates.submit_quiz.description")}</FieldTitle>
            <Body3>{t("templates.submit_quiz.description_hint")}</Body3>
            <TextInput
              id="quiz-template-description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("templates.submit_quiz.description_placeholder")}
              required
              value={description}
            />
          </Field>

          <Field>
            <FieldTitle>{t("templates.submit_quiz.language")}</FieldTitle>
            <Body3>
              <Trans
                i18nKey="templates.submit_quiz.language_hint"
                components={{ support: <Link3 href="/support" /> }}
              />
            </Body3>
            <SubmissionSelect
              ariaLabel={t("templates.submit_quiz.language")}
              isMulti
              leftIcon={<IoLanguage color={defaultTheme.colors.blue6} size={12} />}
              onChange={(v) => setLanguages(v as string[])}
              options={languageOptions}
              placeholder={t("templates.submit_quiz.language_placeholder")}
              value={languages}
            />
          </Field>

          <Field>
            <FieldTitle>{t("templates.submit_quiz.tags")}</FieldTitle>
            <Body3>{t("templates.submit_quiz.tags_hint")}</Body3>
            <SubmissionSelect
              ariaLabel={t("templates.submit_quiz.tags")}
              isMulti
              leftIcon={<BiSolidTag color={defaultTheme.colors.warning4} size={12} style={{ transform: "rotate(180deg)" }} />}
              onChange={(value) => setTags(value as string[])}
              options={tagOptions}
              placeholder={t("templates.submit_quiz.tags_placeholder")}
              value={tags}
            />
          </Field>

          <Terms>
            <Checkbox
              ariaLabel={t("templates.submit_quiz.terms")}
              checked={acceptedTerms}
              id="quiz-template-terms"
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <Body1>
              <Trans
                i18nKey="templates.submit_quiz.terms"
                components={{ terms: <Link3 href="https://shira.app/terms-and-conditions" target="_blank" rel="noreferrer" /> }}
              />
            </Body1>
          </Terms>
        </FormCard>
      </Content>
    </Page>
  );
};

const Page = styled.div`
  min-height: 100vh;
  background: ${defaultTheme.colors.light.paleGrey};
`;

const Header = styled.header`
  height: 72px;
  padding-right: 24px;
  background: ${defaultTheme.colors.light.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Subtitle = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoFrame = styled.div`
  padding: 0 24px;
  border-right: 1px solid ${props => props.theme.colors.dark.mediumGrey};
`;

const Content = styled.main`
  padding: 44px 24px;
`;

const FormCard = styled.form`
  box-sizing: border-box;
  max-width: 1136px;
  margin: 0 auto;
  padding: 48px;
  border-radius: 24px;
  background: ${defaultTheme.colors.light.white};
`;

const Field = styled.div`
  margin-top: 32px;
`;

const SubmissionSelect = styled(FilterSelect)`
  width: 262px;

  button[role="combobox"] {
    min-height: 36px;
    padding: 8px 16px;
  }

  p {
    font-size: 16px;
  }
`;

const FieldTitle = styled(SubHeading3)`
  &::before {
    content: "*";
    color: ${props => props.theme.colors.error7};
    margin-right: 6px;
  }
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 42px;

  p { margin: 0; }
`;

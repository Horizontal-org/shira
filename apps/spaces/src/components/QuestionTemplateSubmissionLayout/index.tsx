import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@horizontal-org/shira-ui";
import { IoLanguage } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import { BiSolidTag } from "react-icons/bi";
import { Trans, useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  getQuizTemplateLanguageOptions,
  getQuizTemplateTagOptions,
  type QuizTemplateFilterOption,
} from "../../fetch/quiz_templates";
import { publishQuestionSubmission } from "../../fetch/submissions";
import { useStore } from "../../store";
import { GenericErrorModal } from "../modals/ErrorModal";

export const QuestionTemplateSubmissionLayout: FunctionComponent = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const space = useStore((state) => state.space);
  const [languages, setLanguages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [languageOptions, setLanguageOptions] = useState<QuizTemplateFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<QuizTemplateFilterOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

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
    questionId && languages.length && tags.length && acceptedTerms && space?.name,
  );

  const handleSubmit = async () => {
    if (!canSubmit || !questionId || !space?.name) return;

    const optionIds = (selectedValues: string[], options: QuizTemplateFilterOption[]) => (
      selectedValues.flatMap((value) => {
        const id = options.find((option) => option.value === value)?.id;
        return typeof id === "number" ? [id] : [];
      })
    );

    setIsSubmitting(true);
    try {
      await publishQuestionSubmission(Number(questionId), {
        spaceDisplayName: space.name,
        langTagIds: optionIds(languages, languageOptions),
        tagIds: optionIds(tags, tagOptions),
      });
      toast.success(t("templates.submit_question.success"));
      navigate("/template-library/my-submissions");
    } catch (error) {
      console.error("Failed to submit question template:", error);
      setSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <LogoFrame><Logo /></LogoFrame>
          <CloseButton
            aria-label={t("templates.submit_question.header_title")}
            iconSize={22}
            onClick={() => navigate(-1)}
          />
          <Body2Regular>{t("templates.submit_question.header_title")}</Body2Regular>
        </HeaderLeft>
        <Button
          disabled={!canSubmit || isSubmitting}
          id="submit-question-template-button"
          onClick={handleSubmit}
          rightIcon={<FiChevronRight size={16} />}
          color={defaultTheme.colors.green7}
          text={t("templates.submit_quiz.submit")}
          type="primary"
        />
      </Header>

      <Content>
        <FormCard>
          <SubHeading1>{t("templates.submit_question.title")}</SubHeading1>
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
            <FieldTitle>{t("templates.submit_quiz.language")}</FieldTitle>
            <Hint>
              <Trans
                i18nKey="templates.submit_quiz.language_hint"
                components={{ support: <Link3 href="/support" /> }}
              />
            </Hint>
            <SubmissionSelect
              ariaLabel={t("templates.submit_quiz.language")}
              isMulti
              leftIcon={<IoLanguage color={defaultTheme.colors.blue6} size={12} />}
              onChange={(value) => setLanguages(value as string[])}
              options={languageOptions}
              placeholder={t("templates.submit_quiz.language_placeholder")}
              value={languages}
            />
          </Field>

          <Field>
            <FieldTitle>{t("templates.submit_quiz.tags")}</FieldTitle>
            <Hint>{t("templates.submit_quiz.tags_hint")}</Hint>
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
              id="question-template-terms"
              onChange={(event) => setAcceptedTerms(event.target.checked)}
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
      <GenericErrorModal
        isOpen={submissionError}
        errorMessage="error_messages.template_submission_failed"
        onCancel={() => setSubmissionError(false)}
        onRetry={() => {
          setSubmissionError(false);
          handleSubmit();
        }}
      />
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

const Subtitle = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  margin-top: 32px;
`;

const Hint = styled(Body3)`
  margin-top: 2px;
  margin-bottom: 12px;
`;

const FieldTitle = styled(SubHeading3)`
  &::before {
    content: "*";
    color: ${props => props.theme.colors.error7};
    margin-right: 6px;
  }
`;

const SubmissionSelect = styled(FilterSelect)`
  width: 262px;

  button[role="combobox"] {
    min-height: 36px;
    padding: 8px 16px;
  }

  p { font-size: 16px; }
`;

const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 42px;

  p { margin: 0; }
`;

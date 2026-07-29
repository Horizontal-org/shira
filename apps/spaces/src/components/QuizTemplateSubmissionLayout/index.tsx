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
import toast from "react-hot-toast";
import {
  getQuizTemplateLanguageOptions,
  getQuizTemplateTagOptions,
  type QuizTemplateFilterOption,
} from "../../fetch/quiz_templates";
import { publishQuestionSubmission, publishQuizSubmission } from "../../fetch/submissions";
import { useStore } from "../../store";
import { GenericErrorModal } from "../modals/ErrorModal";

type LocationState = { quizTitle?: string; questionName?: string };

export const QuizTemplateSubmissionLayout: FunctionComponent = () => {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as { state?: LocationState };
  const { t } = useTranslation();
  const space = useStore((state) => state.space);

  const isQuestionSubmission = Boolean(questionId);
  const translationKey = isQuestionSubmission ? "templates.submit_question" : "templates.submit_quiz";
  const [name, setName] = useState(
    isQuestionSubmission ? location.state?.questionName ?? "" : location.state?.quizTitle ?? "",
  );
  const [description, setDescription] = useState("");
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
    (isQuestionSubmission ? questionId : quizId)
    && name.trim()
    && description.trim()
    && languages.length
    && tags.length
    && acceptedTerms
    && space?.name,
  );

  const handleSubmit = async () => {
    const resourceId = isQuestionSubmission ? questionId : quizId;
    if (!canSubmit || !resourceId || !space?.name) {
      return;
    }

    const optionIds = (selectedValues: string[], options: QuizTemplateFilterOption[]) => (
      selectedValues.flatMap((value) => {
        const id = options.find((option) => option.value === value)?.id;
        return typeof id === "number" ? [id] : [];
      })
    );

    setIsSubmitting(true);

    try {
      const payload = {
        spaceDisplayName: space.name,
        langTagIds: optionIds(languages, languageOptions),
        tagIds: optionIds(tags, tagOptions),
      };
      if (isQuestionSubmission) {
        await publishQuestionSubmission(Number(resourceId), payload);
      } else {
        await publishQuizSubmission(Number(resourceId), payload);
      }
      toast.success(t(`${translationKey}.success`));
      navigate("/template-library/my-submissions");
    } catch (error) {
      console.error("Failed to submit template:", error);
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
            aria-label={t(`${translationKey}.header_title`)}
            iconSize={22}
            onClick={() => navigate(-1)}
          />
          <Body2Regular>{t(`${translationKey}.header_title`)}</Body2Regular>
        </HeaderLeft>
        <Button
          disabled={!canSubmit || isSubmitting}
          id="submit-quiz-template-button"
          onClick={handleSubmit}
          rightIcon={<FiChevronRight size={16} />}
          color={defaultTheme.colors.green7}
          text={t("templates.submit_quiz.submit")}
          type="primary"
        />
      </Header>

      <Content>
        <FormCard>
          <SubHeading1>{t(`${translationKey}.title`)}</SubHeading1>
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
            <FieldTitle>{t(`${translationKey}.name`)}</FieldTitle>
            <Hint>{t(`${translationKey}.name_hint`)}</Hint>
            <TextInput
              id="quiz-template-name"
              label={t(`${translationKey}.name_placeholder`)}
              onChange={(e) => setName(e.target.value)}
              placeholder={t(`${translationKey}.name_placeholder`)}
              value={name}
            />
          </Field>

          <Field>
            <FieldTitle>{t(`${translationKey}.description`)}</FieldTitle>
            <Hint>{t(`${translationKey}.description_hint`)}</Hint>
            <TextInput
              id="quiz-template-description"
              label={t(`${translationKey}.description_placeholder`)}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t(`${translationKey}.description_placeholder`)}
              value={description}
            />
          </Field>

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
              onChange={(v) => setLanguages(v as string[])}
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

const Subtitle = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Hint = styled(Body3)`
  margin-top: 2px;
  margin-bottom: 12px;
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

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
  getLibraryLanguageOptions,
  getLibraryTagOptions,
  type LibraryFilterOption,
} from "../../fetch/library_metadata";
import { publishQuestionSubmission, publishQuizSubmission } from "../../fetch/submissions";
import { useStore } from "../../store";
import { GenericErrorModal } from "../modals/ErrorModal";

type LocationState = { quizTitle?: string; questionName?: string };

export const TemplateSubmissionLayout: FunctionComponent = () => {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as { state?: LocationState };
  const { t } = useTranslation();
  const space = useStore((state) => state.space);

  const submission = questionId
    ? {
      id: questionId,
      initialName: location.state?.questionName,
      publish: publishQuestionSubmission,
      translationKey: "templates.submit_question",
    }
    : {
      id: quizId,
      initialName: location.state?.quizTitle,
      publish: publishQuizSubmission,
      translationKey: "templates.submit_quiz",
    };

  const [name, setName] = useState(submission.initialName);
  const [description, setDescription] = useState("");
  const [languageIds, setLanguageIds] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [languageOptions, setLanguageOptions] = useState<LibraryFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<LibraryFilterOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      const [nextLanguages, nextTags] = await Promise.all([
        getLibraryLanguageOptions(),
        getLibraryTagOptions(),
      ]);
      setLanguageOptions(nextLanguages);
      setTagOptions(nextTags);
    };

    loadOptions();
  }, []);

  const canSubmit = Boolean(
    submission.id
    && name.trim()
    && description.trim()
    && languageIds.length
    && tagIds.length
    && acceptedTerms
    && space?.name,
  );

  const handleSubmit = async () => {
    if (!canSubmit || !submission.id || !space?.name) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        spaceDisplayName: space.name,
        langTagIds: languageIds.map(Number),
        tagIds: tagIds.map(Number),
      };

      await submission.publish(Number(submission.id), payload);

      toast.success(t(`${submission.translationKey}.success`));
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
            aria-label={t(`${submission.translationKey}.header_title`)}
            iconSize={22}
            onClick={() => navigate(-1)}
          />
          <Body2Regular>{t(`${submission.translationKey}.header_title`)}</Body2Regular>
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
          <SubHeading1>{t(`${submission.translationKey}.title`)}</SubHeading1>
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
            <FieldTitle>{t(`${submission.translationKey}.name`)}</FieldTitle>
            <Hint>{t(`${submission.translationKey}.name_hint`)}</Hint>
            <TextInput
              id="quiz-template-name"
              label={t(`${submission.translationKey}.name_placeholder`)}
              onChange={(e) => setName(e.target.value)}
              placeholder={t(`${submission.translationKey}.name_placeholder`)}
              value={name}
            />
          </Field>

          <Field>
            <FieldTitle>{t(`${submission.translationKey}.description`)}</FieldTitle>
            <Hint>{t(`${submission.translationKey}.description_hint`)}</Hint>
            <TextInput
              id="quiz-template-description"
              label={t(`${submission.translationKey}.description_placeholder`)}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t(`${submission.translationKey}.description_placeholder`)}
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
              onChange={(value) => setLanguageIds(value as string[])}
              options={languageOptions.map(({ id, label }) => ({ value: String(id), label }))}
              placeholder={t("templates.submit_quiz.language_placeholder")}
              value={languageIds}
            />
          </Field>

          <Field>
            <FieldTitle>{t("templates.submit_quiz.tags")}</FieldTitle>
            <Hint>{t("templates.submit_quiz.tags_hint")}</Hint>
            <SubmissionSelect
              ariaLabel={t("templates.submit_quiz.tags")}
              isMulti
              leftIcon={<BiSolidTag color={defaultTheme.colors.warning4} size={12} style={{ transform: "rotate(180deg)" }} />}
              onChange={(value) => setTagIds(value as string[])}
              options={tagOptions.map(({ id, label }) => ({ value: String(id), label }))}
              placeholder={t("templates.submit_quiz.tags_placeholder")}
              value={tagIds}
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

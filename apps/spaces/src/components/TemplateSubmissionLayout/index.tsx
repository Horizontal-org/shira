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
  InputHeading,
  Link1,
  Link3,
  Logo,
  styled,
  SubHeading1,
  SubHeading3,
  TextInputArea,
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
import { QUESTION_NAME_MAX_LENGTH, TEMPLATE_DESCRIPTION_MAX_LENGTH, QUIZ_NAME_MAX_LENGTH } from "../../utils/inputLimits";

type LocationState = { quizTitle?: string; questionName?: string; displayName?: string };

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
      resourceType: "question",
    }
    : {
      id: quizId,
      initialName: location.state?.quizTitle,
      publish: publishQuizSubmission,
      resourceType: "quiz",
    };
  const translationKey = `templates.submit_${submission.resourceType}`;

  const [name, setName] = useState(submission.initialName);
  const [description, setDescription] = useState("");
  const [languageIds, setLanguageIds] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [languageOptions, setLanguageOptions] = useState<LibraryFilterOption[]>([]);
  const [tagOptions, setTagOptions] = useState<LibraryFilterOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const nameMaxLength = submission.resourceType === "question"
    ? QUESTION_NAME_MAX_LENGTH
    : QUIZ_NAME_MAX_LENGTH;
  const isWithinCharacterLimits = name.length <= nameMaxLength
    && description.length <= TEMPLATE_DESCRIPTION_MAX_LENGTH;

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
    && space?.name
    && isWithinCharacterLimits,
  );

  const handleSubmit = async () => {
    if (!canSubmit || !submission.id || !space?.name) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        spaceDisplayName: location.state?.displayName ?? space.name,
        templateName: name.trim(),
        templateDescription: description.trim(),
        langTagIds: languageIds.map(Number),
        tagIds: tagIds.map(Number),
      };

      await submission.publish(Number(submission.id), payload);

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
          id={`submit-${submission.resourceType}-template-button`}
          onClick={handleSubmit}
          rightIcon={<FiChevronRight size={16} />}
          color={defaultTheme.colors.green7}
          text={t(`${translationKey}.submit`)}
          type="primary"
        />
      </Header>

      <Content>
        <FormCard>
          <SubHeading1>{t(`${translationKey}.title`)}</SubHeading1>
          <Subtitle>
            <Body1>{t(`${translationKey}.intro`)}</Body1>
            <Body1>
              <Trans
                i18nKey={`${translationKey}.review_notice`}
                components={{ learnMore: <Link1 href="/support" /> }}
              />
            </Body1>
          </Subtitle>

          <Field>
            <InputHeading required>
              <SubHeading3>{t(`${translationKey}.name`)}</SubHeading3>
              <Body3>{t(`${translationKey}.name_hint`)}</Body3>
            </InputHeading>
            <TextInput
              id={`${submission.resourceType}-template-name`}
              label={t(`${translationKey}.name_placeholder`)}
              onChange={(e) => setName(e.target.value)}
              placeholder={t(`${translationKey}.name_placeholder`)}
              value={name}
              required
              showCharacterCount
              maxLength={nameMaxLength}
            />
          </Field>

          <Field>
            <InputHeading required>
              <SubHeading3>{t(`${translationKey}.description`)}</SubHeading3>
              <Body3>{t(`${translationKey}.description_hint`)}</Body3>
            </InputHeading>
            <TextInputArea
              id="template-description"
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t(`${translationKey}.description_placeholder`)}
              value={description}
              required
              showCharacterCount
              maxLength={TEMPLATE_DESCRIPTION_MAX_LENGTH}
            />
          </Field>

          <Field>
            <InputHeading required>
              <SubHeading3>{t(`${translationKey}.language`)}</SubHeading3>
              <Body3>
                <Trans
                  i18nKey={`${translationKey}.language_hint`}
                  components={{ support: <Link3 href="/support" target="_blank" rel="noreferrer" /> }}
                />
              </Body3>
            </InputHeading>
            <SubmissionSelect
              ariaLabel={t(`${translationKey}.language`)}
              isMulti
              leftIcon={<IoLanguage color={defaultTheme.colors.blue6} size={12} />}
              onChange={(value) => setLanguageIds(value as string[])}
              options={languageOptions.map(({ id, label }) => ({ value: String(id), label }))}
              placeholder={t(`${translationKey}.language_placeholder`)}
              value={languageIds}
            />
          </Field>

          <Field>
            <InputHeading required>
              <SubHeading3>{t(`${translationKey}.tags`)}</SubHeading3>
            </InputHeading>
            <Body3>{t(`${translationKey}.tags_hint`)}</Body3>
            <SubmissionSelect
              ariaLabel={t(`${translationKey}.tags`)}
              isMulti
              leftIcon={<BiSolidTag color={defaultTheme.colors.warning4} size={12} style={{ transform: "rotate(180deg)" }} />}
              onChange={(value) => setTagIds(value as string[])}
              options={tagOptions.map(({ id, label }) => ({ value: String(id), label }))}
              placeholder={t(`${translationKey}.tags_placeholder`)}
              value={tagIds}
            />
          </Field>

          <Terms>
            <Checkbox
              ariaLabel={t(`${translationKey}.terms`)}
              checked={acceptedTerms}
              id={`${submission.resourceType}-template-terms`}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <Body1>
              <Trans
                i18nKey={`${translationKey}.terms`}
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

const Terms = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 42px;

  p { margin: 0; }
`;

import { FunctionComponent } from "react";
import { Body3, Button, Modal, styled, SubHeading1, SubHeading3, useTheme } from "@shira/ui";
import { useTranslation } from "react-i18next";
import { IoMdCheckmarkCircle, IoMdHelpCircle } from "react-icons/io";
import { FiX } from "react-icons/fi";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
}

type ComparisonValue = boolean | string;

export const ViewPlansModal: FunctionComponent<Props> = ({
  isModalOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const comparisonSections = [
    {
      title: t("modals.view_plans.comparison.admin_management"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.hosting"),
          values: [
            t("modals.view_plans.comparison.values.cloud"),
            t("modals.view_plans.comparison.values.cloud"),
            t("modals.view_plans.comparison.values.cloud_on_premise"),
          ],
        },
        {
          label: t("modals.view_plans.comparison.rows.admin_dashboard"),
          values: [true, true, true],
        },
        {
          label: t("modals.view_plans.comparison.rows.number_of_admins"),
          hasInfo: true,
          values: [
            t("modals.view_plans.comparison.values.one_admin"),
            t("modals.view_plans.comparison.values.unlimited"),
            t("modals.view_plans.comparison.values.unlimited"),
          ],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.customization"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.customizable_questions"),
          values: [true, true, true],
        },
        {
          label: t("modals.view_plans.comparison.rows.question_library"),
          values: [true, true, true],
        },
        {
          label: t("modals.view_plans.comparison.rows.custom_quizzes"),
          values: [
            t("modals.view_plans.comparison.values.up_to_three_custom_quizzes"),
            t("modals.view_plans.comparison.values.unlimited"),
            t("modals.view_plans.comparison.values.unlimited"),
          ],
        },
        {
          label: t("modals.view_plans.comparison.rows.apps"),
          hasInfo: true,
          values: [true, true, true],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.access_control"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.public_quizzes"),
          hasInfo: true,
          values: [true, true, true],
        },
        {
          label: t("modals.view_plans.comparison.rows.private_quizzes"),
          hasInfo: true,
          values: ["-", true, true],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.compliance"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.basic_analytics"),
          hasInfo: true,
          values: [true, true, true],
        },
        {
          label: t("modals.view_plans.comparison.rows.detailed_analytics"),
          hasInfo: true,
          values: ["-", true, true],
        },
        {
          label: t("modals.view_plans.comparison.rows.analysis_tools"),
          hasInfo: true,
          values: ["-", true, true],
        },
      ],
    },
    {
      title: t("modals.view_plans.comparison.custom_support"),
      rows: [
        {
          label: t("modals.view_plans.comparison.rows.tailor_made_training"),
          values: ["-", "-", true],
        },
        {
          label: t("modals.view_plans.comparison.rows.priority_support"),
          values: ["-", "-", true],
        },
      ],
    },
  ];

  const renderValue = (value: ComparisonValue) => {
    if (typeof value === "boolean") {
      return <IoMdCheckmarkCircle size={28} color={theme.colors.green6} />;
    }

    return <ValueText>{value}</ValueText>;
  };

  return (
    <StyledModal
      id="view-plans-modal"
      isOpen={isModalOpen}
      title={t("modals.view_plans.modal_title")}
      titleIcon={<CloseButton onClick={onClose} aria-label={t("buttons.close")}><FiX size={28} /></CloseButton>}
      primaryButtonText={t("buttons.close")}
      secondaryButtonText=""
      onPrimaryClick={onClose}
      onClose={onClose}
      size="large"
    >
      <Content>
        <PlansList>
          <PlanSpacer />

          <PlanCard>
            <PlanContent>
              <PlanTitle>{t("modals.view_plans.plans.starter.title")}</PlanTitle>
              <PlanDescription>{t("modals.view_plans.plans.starter.description")}</PlanDescription>
              <PriceBlock>
                <PlanPrice>{t("modals.view_plans.plans.starter.price")}</PlanPrice>
                <PlanNote>{t("modals.view_plans.plans.starter.note")}</PlanNote>
              </PriceBlock>
            </PlanContent>
            <PlanButton
              text={t("modals.view_plans.plans.starter.cta")}
              color={theme.colors.green7}
              onClick={onClose}
            />
          </PlanCard>

          <PlanCard $isHighlighted>
            <PlanContent>
              <PlanTitle>{t("modals.view_plans.plans.pro.title")}</PlanTitle>
              <PlanDescription>{t("modals.view_plans.plans.pro.description")}</PlanDescription>
              <PriceBlock>
                <PlanPrice>{t("modals.view_plans.plans.pro.price")}</PlanPrice>
                <PlanNote>{t("modals.view_plans.plans.pro.note")}</PlanNote>
              </PriceBlock>
            </PlanContent>
            <PlanButton
              text={t("modals.view_plans.plans.pro.cta")}
              color={theme.colors.green7}
              onClick={onClose}
            />
          </PlanCard>

          <PlanCard>
            <PlanContent>
              <PlanTitle>{t("modals.view_plans.plans.enterprise.title")}</PlanTitle>
              <PlanDescription>{t("modals.view_plans.plans.enterprise.description")}</PlanDescription>
              <PriceBlock>
                <PlanPrice>{t("modals.view_plans.plans.enterprise.price")}</PlanPrice>
                <PlanNote>{t("modals.view_plans.plans.enterprise.note")}</PlanNote>
              </PriceBlock>
            </PlanContent>
            <PlanButton
              text={t("modals.view_plans.plans.enterprise.cta")}
              color={theme.colors.green7}
              onClick={onClose}
            />
          </PlanCard>
        </PlansList>

        <ComparisonGrid>
          <ComparisonScroller>
            <ComparisonTable>
              <ComparisonHeader>{t("modals.view_plans.comparison.title")}</ComparisonHeader>
              <EmptyHeaderCell />
              <EmptyHeaderCell />
              <EmptyHeaderCell />

              {comparisonSections.map((section, sectionIndex) => (
                <SectionGroup key={section.title}>
                  <SectionTitle $isFirst={sectionIndex === 0}>{section.title}</SectionTitle>
                  <EmptySectionCell $isFirst={sectionIndex === 0} />
                  <EmptySectionCell $isFirst={sectionIndex === 0} />
                  <EmptySectionCell $isFirst={sectionIndex === 0} />

                  {section.rows.map((row) => (
                    <RowGroup key={row.label}>
                      <FeatureCell>
                        <FeatureLabel>{row.label}</FeatureLabel>
                        {row.hasInfo && <IoMdHelpCircle size={20} color={theme.colors.dark.mediumGrey} />}
                      </FeatureCell>

                      {row.values.map((value, index) => (
                        <ValueCell key={`${row.label}-${index}`}>
                          {renderValue(value)}
                        </ValueCell>
                      ))}
                    </RowGroup>
                  ))}
                </SectionGroup>
              ))}
            </ComparisonTable>
          </ComparisonScroller>
        </ComparisonGrid>
      </Content>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  width: min(1380px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);

  > div:first-child {
    padding-bottom: 12px;
  }

  > div:nth-child(2) {
    padding-top: 8px;
    padding-bottom: 32px;
    overflow-y: auto;
  }

  > div:last-child {
    display: none;
  }
`;

const CloseButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.dark.darkGrey};
  line-height: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const PlansList = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1.45fr) repeat(3, minmax(240px, 1fr));
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PlanSpacer = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const PlanCard = styled.div<{ $isHighlighted?: boolean }>`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 24px 22px;
  border: 1px solid ${props => props.theme.colors.dark.lightGrey};
  border-radius: 36px;
  background: ${props => props.$isHighlighted
    ? props.theme.colors.light.paleGreen
    : props.theme.colors.light.white};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-height: unset;
    padding: 24px 20px 20px;
    border-radius: 28px;
  }
`;

const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanTitle = styled(SubHeading1)`
  margin: 0 0 8px;
  color: ${props => props.theme.colors.dark.black};
  font-size: 26px;
`;

const PlanDescription = styled(Body3)`
  margin: 0;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 14px;
`;

const PriceBlock = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PlanPrice = styled(SubHeading3)`
  margin: 0;
  color: ${props => props.theme.colors.green7};
  font-size: 21px;
  font-weight: 600;
`;

const PlanNote = styled(Body3)`
  margin: 0;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 14px;
`;

const PlanButton = styled(Button)`
  margin-top: 24px;
  justify-content: center;
`;

const ComparisonGrid = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const ComparisonScroller = styled.div`
  overflow-x: auto;
  padding-bottom: 4px;
`;

const ComparisonTable = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 1.45fr) repeat(3, minmax(240px, 1fr));
  min-width: 1120px;
`;

const ComparisonHeader = styled.div`
  padding: 8px 32px 28px;
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 22px;
  line-height: 1.3;
  font-weight: 600;
`;

const EmptyHeaderCell = styled.div`
`;

const SectionGroup = styled.div`
  display: contents;
`;

const RowGroup = styled.div`
  display: contents;
`;

const SectionTitle = styled.div<{ $isFirst?: boolean }>`
  padding: ${props => props.$isFirst ? "30px 32px 18px" : "62px 32px 18px"};
  color: ${props => props.theme.colors.green7};
  font-size: 14px;
  line-height: 1.3;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const EmptySectionCell = styled.div<{ $isFirst?: boolean }>`
  padding-top: ${props => props.$isFirst ? "30px" : "62px"};
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const FeatureCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 18px 32px;
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const FeatureLabel = styled.span`
  color: ${props => props.theme.colors.dark.black};
  font-size: 15px;
  line-height: 1.35;
  font-weight: 600;
`;

const ValueCell = styled(Body3)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.light.paleGrey};
`;

const ValueText = styled.span`
  color: ${props => props.theme.colors.dark.darkGrey};
  font-size: 15px;
  line-height: 1.35;
`;

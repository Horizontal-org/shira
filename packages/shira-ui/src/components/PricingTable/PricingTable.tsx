import { FunctionComponent, ReactNode, useState } from "react";
import { Button } from "../Button";
import { Body3, SubHeading1, SubHeading3 } from "../Typography";
import { GeneralTooltip } from "../GeneralTooltip";
import styled, { useTheme } from "styled-components";
import { IoMdCheckmarkCircle, IoMdHelpCircle } from "react-icons/io";

type PlanButtonType = "primary" | "outline";
type PlanId = "starter" | "pro" | "enterprise";

export interface PricingPlan {
  id: PlanId;
  title: string;
  price: string;
  description: string;
  buttonText: string;
  buttonType?: PlanButtonType;
  buttonColor?: string;
  isCurrentPlan?: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
}

export interface FeatureValue {
  type: 'text' | 'check' | 'custom'
  value?: string | ReactNode
}

export interface PricingFeatureRow {
  label: string;
  tooltip?: string;
  values: [FeatureValue, FeatureValue, FeatureValue];
}

export interface PricingFeatureSection {
  title: string;
  rows: PricingFeatureRow[];
}

export interface PricingTableProps {
  learnMoreText: string;
  onLearnMoreClick: () => void;
  plans: [PricingPlan, PricingPlan, PricingPlan];
  sections: PricingFeatureSection[];
}

const FeatureTooltipIcon: FunctionComponent<{ label: string }> = ({ label }) => {
  const theme = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <GeneralTooltip
      enabled={true}
      show={showTooltip}
      setShow={setShowTooltip}
      label={label}
      placement="bottom-start"
    >
      <IoMdHelpCircle size={20} color={theme.colors.dark.mediumGrey} />
    </GeneralTooltip>
  );
};

export const PricingTable: FunctionComponent<PricingTableProps> = ({
  learnMoreText,
  onLearnMoreClick,
  plans,
  sections,
}) => {
  const theme = useTheme();

  return (
    <Content>
      <PlansList>
        <PlanSpacer />
        {plans.map((plan) => (
          <PlanCard key={plan.id} id={`${plan.id}-plan-card`} $isHighlighted={plan.isHighlighted}>
            <PlanCopy>
              <PlanTitle>{plan.title}</PlanTitle>
              <PriceBlock>
                <PlanPrice>{plan.price}</PlanPrice>
              </PriceBlock>
              <PlanDescription>{plan.description}</PlanDescription>
            </PlanCopy>
            <PlanButton
              text={plan.buttonText}
              type={plan.buttonType ?? "primary"}
              color={plan.buttonColor}
              onClick={plan.onClick}
              disabled={plan.isCurrentPlan}
            />
          </PlanCard>
        ))}
      </PlansList>

      <ComparisonGrid>
        <ComparisonScroller>
          <ComparisonTable id="plans-comparison-table">
            {sections.map((section, sectionIndex) => (
              <SectionFragment key={section.title}>
                <SectionTitle $isFirst={sectionIndex === 0}>{section.title}</SectionTitle>
                <EmptySectionCell $isFirst={sectionIndex === 0} />
                <EmptySectionCell $isFirst={sectionIndex === 0} />
                <EmptySectionCell $isFirst={sectionIndex === 0} />

                {section.rows.map((row) => (
                  <FeatureRowFragment key={row.label}>
                    <FeatureCell>
                      <FeatureLabel>{row.label}</FeatureLabel>
                      {row.tooltip ? <FeatureTooltipIcon label={row.tooltip} /> : null}
                    </FeatureCell>
                    {row.values.map((value, index) => (
                      <ValueCell key={`${row.label}-${index}`}>
                        {value.type === "check" ? (
                          <IoMdCheckmarkCircle size={28} color={theme.colors.green6} />
                        ) : value.type === "text" ? (
                          <ValueText>{value.value}</ValueText>
                        ) : (
                          value.value
                        )}
                      </ValueCell>
                    ))}
                  </FeatureRowFragment>
                ))}
              </SectionFragment>
            ))}
          </ComparisonTable>
        </ComparisonScroller>
      </ComparisonGrid>

      <BottomAction>
        <Button
          id="plans-learn-more"
          text={learnMoreText}
          type="outline"
          onClick={onLearnMoreClick}
        />
      </BottomAction>
    </Content>
  );
};

const SectionFragment = styled.div`
  display: contents;
`;

const FeatureRowFragment = styled.div`
  display: contents;
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

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const PlanSpacer = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const PlanCard = styled.div<{ $isHighlighted?: boolean }>`
  min-height: 220px;
  display: flex;
  flex-direction: column;
  padding: 28px 24px 22px;
  border: 1px solid ${(props) => props.theme.colors.dark.lightGrey};
  border-radius: 36px;
  background: ${(props) =>
    props.$isHighlighted ? props.theme.colors.light.paleGreen : props.theme.colors.light.white};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    min-height: unset;
    padding: 24px 20px 20px;
    border-radius: 28px;
  }
`;

const PlanCopy = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanTitle = styled(SubHeading1)`
  margin: 0;
  color: ${(props) => props.theme.colors.dark.black};
  font-size: 26px;
`;

const PlanPrice = styled(SubHeading3)`
  color: ${(props) => props.theme.colors.green7};
  font-size: 21px;
  font-weight: 600;
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PlanDescription = styled(Body3)`
  color: ${(props) => props.theme.colors.dark.darkGrey};
`;

const PlanButton = styled(Button)`
  width: 100%;
  margin-top: auto;
  justify-content: center;
  flex-shrink: 0;
  position: relative;

  &:focus,
  &:active {
    margin-top: auto;
    top: 0;
  }
`;

const ComparisonGrid = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const BottomAction = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 4px;
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

const SectionTitle = styled.div<{ $isFirst?: boolean }>`
  padding: ${(props) => (props.$isFirst ? "30px 32px 18px" : "62px 32px 18px")};
  color: ${(props) => props.theme.colors.green7};
  font-size: 14px;
  line-height: 1.3;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-bottom: 1px solid ${(props) => props.theme.colors.light.paleGrey};
`;

const EmptySectionCell = styled.div<{ $isFirst?: boolean }>`
  padding-top: ${(props) => (props.$isFirst ? "30px" : "62px")};
  border-bottom: 1px solid ${(props) => props.theme.colors.light.paleGrey};
`;

const FeatureCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 18px 32px;
  border-bottom: 1px solid ${(props) => props.theme.colors.light.paleGrey};
`;

const FeatureLabel = styled.span`
  color: ${(props) => props.theme.colors.dark.black};
  font-size: 15px;
  line-height: 1.35;
  font-weight: 600;
`;

const ValueCell = styled(Body3)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.light.paleGrey};
`;

const ValueText = styled.span`
  color: ${(props) => props.theme.colors.dark.darkGrey};
  font-size: 15px;
  line-height: 1.35;
`;

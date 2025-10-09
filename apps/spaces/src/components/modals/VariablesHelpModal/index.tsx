import { FunctionComponent } from "react";
import { Body1, Modal, styled, ExplanationIcon } from "@shira/ui";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (handle: boolean) => void;
}

export const VariablesHelpModal: FunctionComponent<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      titleIcon={
        <SvgWrapper>
          <ExplanationIcon />
        </SvgWrapper>
      }
      title="Variables"
      primaryButtonText="OK"
      primaryButtonDisabled={false}
      secondaryButtonText="Cancel"
      onPrimaryClick={() => {
        setIsModalOpen(false);
      }}
    >
      <div>
        <Body1>
          Variables are placeholders that you can use to insert personalized
          information into a question.
        </Body1>
        <MiddleBody1>
          The information shown is relevant to each learner, based on what they
          entered or auto-generated during quiz setup.
        </MiddleBody1>
        <MiddleBody1>To add a variable, type the following:</MiddleBody1>

        <VariableList>
          <VariableItem>
            <VariableTag>{`{{name}}`}</VariableTag>
            <Body1>This will display the learner's name</Body1>
          </VariableItem>
          <VariableItem>
            <VariableTag>{`{{email}}`}</VariableTag>
            <Body1>This will display the learner's email address</Body1>
          </VariableItem>
        </VariableList>
      </div>
    </Modal>
  );
};

const MiddleBody1 = styled(Body1)`
  padding-top: 16px;
`;

const SvgWrapper = styled.div`
  width: 28px;
  height: 28px;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

const VariableList = styled.ul`
  padding-left: 16px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const VariableItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VariableTag = styled("Button2")`
  background: #f3f3f3;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 600;
`;
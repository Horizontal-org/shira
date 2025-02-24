import { FunctionComponent } from "react";
import {styled, SettingsFishIcon, Body1, Button } from '@shira/ui'
import { FiPlus } from "react-icons/fi";

export const EmptyState: FunctionComponent = () => {
  return (
    <Container>
      <SettingsFishIcon />
      <Body1>You don’t have any questions yet. Click on “Add question” to get started.</Body1>
       <Button 
          leftIcon={<FiPlus size={16} />}
          text="Add question"
          type="primary"
          color="#849D29"
          onClick={() => console.log('Add new question')}
        />
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  padding: 48px 16px;
  gap:16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;


export default EmptyState;
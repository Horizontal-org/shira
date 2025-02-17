import { FunctionComponent } from "react";
import {styled, SettingsFishIcon, Body1 } from '@shira/ui'

export const EmptyState: FunctionComponent = () => {
  return (
    <Container>
      <SettingsFishIcon />
      <Body1>You don’t have any questions yet. Click on “Add question” to get started.</Body1>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  padding: 16px;
  gap:16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;


export default EmptyState;
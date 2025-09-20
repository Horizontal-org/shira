import styled from 'styled-components'
import { FunctionComponent } from 'react';
import { H2, Body3, Box } from '@shira/ui';
import { QuestionLibraryFlowManagement } from '../QuestionLibraryFlowManagement';

type Props = {};

export const QuestionLibraryListLayout: FunctionComponent<Props> = () => {
  return (
    <QuestionLibraryFlowManagement>
      <StyledBox>
        <div>
          <H2>Question Library</H2>
          <Body3>
            Select a question from list below to add it to your quiz. Once you’ve added it to your quiz, you can edit the question to fully customize it, including changing the text and explanations.
          </Body3>
        </div>
      </StyledBox>
    </QuestionLibraryFlowManagement>
  );
};

const StyledBox = styled(Box)`
  position: relative;
  z-index:1;
  padding: 48px;
  width: 1024px;
`;

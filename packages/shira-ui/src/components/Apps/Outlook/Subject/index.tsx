import { FunctionComponent } from "react";
import styled from 'styled-components'
import { WhiteBar } from "../components/Whitebar";

import Dismiss from '../globalIcons/Dismiss'
import { OutlookCustomElements } from "..";

interface Props {
  subject: OutlookCustomElements
}

const parseSubjectText = (subjectText: string) => {
    return subjectText && subjectText.length > 0 ?
      subjectText : `(no subject)`
}

export const Subject:FunctionComponent<Props> = ({subject}) => {
  if (!subject) return
  return (
    <WhiteWrapper>
      <WhiteBar>
        <CloseButton>
          <Dismiss />
        </CloseButton>
        <SubjectText data-explanation={subject.explanationPosition}>{ parseSubjectText(subject.textContent) }</SubjectText>
      </WhiteBar>
    </WhiteWrapper>
  )
}

const WhiteWrapper = styled.div`
  padding-left: 12px;
  margin-top: 8px;
  box-sizing: border-box;

  > div {
    padding-left: 12px;
  }
`

const CloseButton = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
  }
`

const SubjectText = styled.div`
  padding-left: 14px;
  font-size: 14px;
  color: #242424;
  font-weight: 600;
  padding-bottom: 1px;
`
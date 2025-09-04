import { FunctionComponent } from "react";
import styled from 'styled-components'
import { WhiteBar } from "../components/Whitebar";

import Dismiss from '../globalIcons/Dismiss'
import LeftChevron from './icons/LeftChevron'
import RightChevron from './icons/RightChevron'

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
    <>
      <MobileHeader>
        <LeftChevron />
      </MobileHeader>
      <WhiteWrapper>
        <StyledWhiteBar>
          <div>
            <CloseButton>
              <Dismiss />
            </CloseButton>
            <SubjectText data-explanation={subject.explanationPosition}>{ parseSubjectText(subject.textContent) }</SubjectText>
          </div>
          <div>
            <ChevronWrapper><LeftChevron /></ChevronWrapper>
            <ChevronWrapper><RightChevron /></ChevronWrapper>
          </div>
        </StyledWhiteBar>
      </WhiteWrapper>
    </>
  )
}

const WhiteWrapper = styled.div`  
  margin-top: 8px;
  box-sizing: border-box;
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

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const SubjectText = styled.div`
  padding-left: 14px;
  font-size: 14px;
  color: #242424;
  font-weight: 600;
  padding-bottom: 1px;

  @media(max-width: ${props => props.theme.breakpoints.xs}) {;
    font-size: 20px;
  }
`

const StyledWhiteBar = styled(WhiteBar)`
  justify-content: space-between;
  padding: 6px 12px;

  > div {
    display: flex;
    align-items: center; 
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    background: #f8f8f8;
    box-shadow: none;
    height:auto;
  }
`

const ChevronWrapper = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  border-radius: 4px;
  cursor: pointer;

  > svg {
    height: 16px;
    width; 16px;
    fill: #424242; 
  }

  &:hover {
    background-color: #f0f0f0;
    
    > svg {
      fill: #115EA3; 
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }
`

const MobileHeader = styled.div`
  @media(min-width: ${props => props.theme.breakpoints.xs}) {
    display: none;
  }

  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 8px;
  background: white;
  width: 100%;

  > svg {
    height: 28px;
    width: 28px;
  }
`
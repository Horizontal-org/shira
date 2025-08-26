import { FunctionComponent } from "react";
import styled from 'styled-components'
import { Button } from "./components/Button";

import MailColor from './components/MailColor'
import CalendarColor from './components/CalendarColor'
import PeopleColor from './components/PeopleColor'
import { WordColor } from "./components/WordColor";
import { ExcelColor } from './components/ExcelColor' 
import PowerpointColor from './components/PowerpointColor'

interface Props {}

export const Sidebar:FunctionComponent<Props> = ({}) => {
  return (
    <Wrapper>
      <Button selected={true}>
        <SvgColorWrapper>
          <MailColor />
        </SvgColorWrapper>
      </Button>
      <Button selected={false}>
        <SvgColorWrapper>
          <CalendarColor />
        </SvgColorWrapper>
      </Button>
      <Button selected={false}>
        <SvgColorWrapper>
          <PeopleColor />
        </SvgColorWrapper>
      </Button>
      <Button selected={false}>
        <SvgColorWrapper>
          <WordColor />
        </SvgColorWrapper>
      </Button>
      <Button selected={false}>
        <SvgColorWrapper>
          <ExcelColor />
        </SvgColorWrapper>
      </Button>
      <Button selected={false}>
        <SvgColorWrapper>
          <PowerpointColor />
        </SvgColorWrapper>
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 4px;
  background: #F0F0F0;
  height: 100%;
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-right: 4px;
`

const SvgColorWrapper = styled.div`
  width: 20px;
  height: 20px;
`

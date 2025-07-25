import { FunctionComponent, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from 'styled-components'
import { Body3 } from "../Typography";

export interface BetaBannerProps {
  url?: string
}

export const BetaBanner:FunctionComponent<BetaBannerProps> = ({ url = '/support' }) => {
  const [showBanner, handleShowBanner] = useState(false)

  useEffect(() => {
    const hide = localStorage.getItem("shira_hide_beta_banner");
    handleShowBanner(!(hide === 'yes'))     
  }, [])

  return showBanner && (
    <Wrapper>
      <div></div>
      <Body3>
        <strong>BETA</strong>: Shira is still in development and you may experience issues. Click <a target={url.includes('https:') ? '_blank' : '_self'} href={url}>here</a> to share your feedback and help us improve!
      </Body3>
      <SvgWrapper onClick={() => {
        handleShowBanner(false)
        localStorage.setItem('shira_hide_beta_banner', 'yes')
      }}>
        <IoMdClose color="#5F6368" size={24}/>
      </SvgWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  z-index: 2;
  width: 100%;
  height: 48px;
  min-height: 48px;
  padding: 0 8px;
  background: #DBE3A3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  > p > a {
    color: black; 
  }

   @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 80px;
    justify-content: flex-start;
  }
`

const SvgWrapper = styled.div`
  cursor: pointer;
`
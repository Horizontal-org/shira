import { FunctionComponent, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from 'styled-components'
import { Body3 } from "../Typography";

export interface BannerProps {
  url?: string;
  label?: string;
  message?: string;
  clickHereText?: string;
  feedbackText?: string;
  brand?: string;
}

export const Banner:FunctionComponent<BannerProps> = ({ 
  url, 
  label, 
  message, 
  clickHereText, 
  feedbackText,
  brand = 'secondary'
}) => {
  const [showBanner, handleShowBanner] = useState(false)

  useEffect(() => {
    const hide = localStorage.getItem("shira_hide_beta_banner");
    handleShowBanner(!(hide === 'yes'))     
  }, [])

  return showBanner && (
     <Wrapper $brand={brand}>
      <Empty></Empty>
      <Body3>
        <strong>{label}</strong>: {message} {' '}
        { clickHereText && (
          <a 
            target={url.includes('https:') ? '_blank' : '_self'} 
            href={url}
          >
            {clickHereText}
          </a> 
        )}
        {' '}
        {feedbackText || ''}
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

const Empty = styled.div`
  display: block;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`
const Wrapper = styled.div<{ $brand: string }>`
  z-index: 2;
  width: 100%;
  height: 48px;
  min-height: 48px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  > p > a {
    color: black; 
  }

   @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 80px;
    justify-content: space-between;
  }

  ${props => props.$brand === 'primary' && `
    background: ${props.theme.colors.blue0}
  `}

  ${props => props.$brand === 'secondary' && `
    background: #DBE3A3;    
  `}
`

const SvgWrapper = styled.div`
  cursor: pointer;
  height: 24px;
`
import { FunctionComponent } from "react";
import styled from "styled-components";
import blurredAsset from "./assets/blurred-pdf.png";

interface Props {
  name: string
}

// deterministic way to get a random-seeming page count based on the input name :)
const generatePageCount = (name: string) => {
    return (name.length % 6) + 2
}

export const BlurredPDF:FunctionComponent<Props> = ({ name }) => {
  return (
    <Wrapper>
      <BlurryImage bg={blurredAsset}/>
      <ContentWrapper>
          <NameContainer>{name}</NameContainer>
          <MetadataContainer>
              <span>{generatePageCount(name)} pages</span>
              <CenterDot>·</CenterDot>
              <span>{generatePageCount(name) * 135 + name.length} kB</span> 
              <CenterDot>·</CenterDot>
              <span>PDF</span>
          </MetadataContainer>
      </ContentWrapper>
      <span>00:00</span>
    </Wrapper>
  )
}

const NameContainer = styled.div`
    max-width: 300px;
    word-wrap: break-word;
`

const MetadataContainer = styled.div`
    display: flex;
    font-size: 0.8rem;
    color: gray;
    gap: 0.25rem;
`

const CenterDot = styled.span`
    font-size: 16px !important;
    margin-top: -0.15rem;
    font-weight: bold;
`

const ContentWrapper = styled.div`
    width: 16rem;
    min-height: 3rem;
    background: #f5f6f6;
    padding: 0.5rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
`

const BlurryImage = styled("div")<{bg: string}>`
    width: 200px;
    height: 100px;
    background: no-repeat url(${props => props.bg});
    background-size: 200px !important;

    object-fit: contain;
    border-radius: 7.5px;
`

const Wrapper = styled.div`
  max-width: 85%;

  position:relative;
  display: inline-block;
  
  background: #fff;
  border-radius: 7.5px;
  padding: 3px;
  box-shadow: 0 1px 0.5px rgba(11,20,26, .13);
  margin: 4px 0; 
  box-sizing: border-box;

  > span {
    z-index: 3;
    position: absolute;
    bottom: 6px;
    right: 8px;
    font-size: 9px;
    color: grey;
    font-weight: 200;
  }
`


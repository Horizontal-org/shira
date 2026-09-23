import { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  name: string,
  explanationPosition?: string
}

// used to set colour of attachment folder icon
const getColor = (filename: string) => {
    if (filename.endsWith(".docx")) { return { main: "#2E6AC5", highlight: "#84A7DC" }}
    if (filename.endsWith(".odt")) { return { main: "#027EB5", highlight: "#66B1D3"}}
    if (filename.endsWith(".xlsx")) { return { main: "#228D51", highlight: "#7ABB97"}}
    return { main: "#6C757A", highlight: "#ACB1B3" }
}

const getExtension = (filename: string) => {
    const i = filename.lastIndexOf(".")
    if (i <= 0) {
        return ""
    }
    const ext = filename.slice(i+1).toLowerCase()
    return ext.toUpperCase()
}

const getIcon = (filename: string) => {
    const ext = getExtension(filename).toLowerCase()
    if (ext == "docx") { return "W" }
    if (ext == "xlsx") { return "X" }
    if (ext == "html") { return "HTM" }
    if (ext == "jpeg") { return "JPG" }
    return ext.toUpperCase()
}

// TODO (2026-09-22): for xlsx and word - get icon; all others, return three letter extension
// NOTE: jpeg jpg heic etc html

export const Attachment: FunctionComponent<Props> = ({ name, explanationPosition }) => {
  const colorPair = getColor(name)
  const backgroundColor = "#F5F6F6"
  return (
    <Wrapper>
      <Card data-explanation={explanationPosition}>
        <IconInfoWrapper>
          <AttachmentFolder bgColor={colorPair.main}>
              <AttachmentFolderType smaller={getIcon(name).length > 3}>{getIcon(name)}</AttachmentFolderType>
          </AttachmentFolder>
          <RibbonContainer>
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 10" width="21px">
              <path id="ribbon" fill={colorPair.highlight} stroke="none" d="M0,10 L0,0 L10,10"/>
              <path id="ribbon" fill={backgroundColor} stroke="none" d="M0,0 L10,0 L10,12"></path>
              </svg>
          </RibbonContainer>
          <InfoContainer>
            <Filename>
              {name}
            </Filename>
            <MetadataContainer>
                <span>2.5 MB</span>
                <CenterDot>·</CenterDot>
                <span>{getExtension(name)}</span>
            </MetadataContainer>
          </InfoContainer>
        </IconInfoWrapper>
        <span>00:00</span>
      </Card>
    </Wrapper>
  )
}

const RibbonContainer = styled.div`
    position: relative;
    top: -12px;
    right: 17px;
    width: 0px;
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
const IconInfoWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 14.5rem;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.025rem;
`

const Filename = styled.div`
  color: #333;
`
const AttachmentFolder = styled("div")<{bgColor: string}>`
    display: flex;
    align-items: end;
    justify-content: center;
    width: 26px;
    height: 30px;
    background: ${props => props.bgColor};
    border-radius: 0.25rem;
`

const AttachmentFolderType = styled("div")<{smaller: boolean}>`
    font-weight: bold;
    align-items: end;
    color: white;
    font-size: ${props => props.smaller ? "10" : "11"}px;
    padding-bottom: 0.15rem;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
`

const Download = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px 0 36px;

  > svg {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    fill: rgba(84,101,111, 0.5);
  }
`

const Card = styled.div`

  float: left;
  background: #fff;
  border-radius: 7.5px;
  padding: 6px 7px 8px 9px;
  box-shadow: 0 1px 0.5px rgba(11,20,26, .13);
  margin: 2px 0; 

  > div {
    cursor: pointer;
    background: #f5f6f6;
    border-radius: 7.5px;
    padding: 8px;
    display: flex;
    align-items: center;
  }

  > span {
    font-size: 9px;
    color: #667781;
    float: right;
    padding-top: 2px;    
    font-weight: 200;
    margin-bottom: -2px;
  }

`

const Name = styled.div`
  display: inline;
  text-align: left;
  font-size: 12px;
  color: #111b21;

  h1, h2, h3, h4, h5 {
    font-size: 12px;
    margin: 0.8px;
  }

  p {
    margin: 0.8px;
  }
`

const ImageWrapper = styled.img`
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  width: 26px;
  height: 30px;
`

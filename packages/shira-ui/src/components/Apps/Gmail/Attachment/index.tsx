import { FunctionComponent } from 'react'
import styled from 'styled-components'
// import {
//   ImageIcon,
//   VideoIcon,
//   AudioIcon,
//   GenericAttachmentIcon,
//   PdfIcon,
// } from '../../../Icons';
import { AttachmentType } from '../../../Attachments';
import AddToDriveIcon from '../Attachment/components/AddToDriveIcon'
import { MdOutlineFileDownload } from 'react-icons/md'

import PDFIcon from "./assets/pdf_x16.png"
import ArchiveIcon from "./assets/archive_x16.png"
import WordIcon from "./assets/word_x16.png"
import ExcelIcon from "./assets/excel_x16.png"
import DocsIcon from "./assets/docs_x16.png"
import VideoIcon from "./assets/video_x16.png"
import ImageIcon from "./assets/image_x16.png"
import AudioIcon from "./assets/audio_x16.png"
import OtherIcon from "./assets/misc-video_x16.png"
import ThumbnailSheet from "./assets/gg-assets-sheet.png"

interface Props {
  position: string;
  name: string;
  explanationPosition: string | null;
  type?: string;
}

// ribbon colours that are associated with various file attachment types
const documentBlue = "#4986E7"
// specific blue for Word/docx
const docxBlue = "#0082EF"
// misc: mp4, jpg, png
const veryLightGrey = "#dedede"
// left ribbon default
const leftRibbonGrey = "#C4C4C4"
// misc: avi
const darkGrey = "#777777"
// audio files mp3 etc
const audioRed = "#DB4437"
// specifically for pdf
const pdfRed = "#FB4C2F"
// xlsx etc
const sheetsGreen = "#00A953"
// zip etc
const archiveWhite = "#FFFFFF"

// TODO (2026-09-11): adapt sizes and units based on incoming file extension
const randomizeFileSize = () => {
  const size = 100 + Math.floor(Math.random() * 500)
  return `${size} KB`
}

// what we actually want to do
// input attachment type + filename
// output: { icon, thumbnail, colour }

// TODO (2026-09-08): need to also get colour based on outcome from something like 'renderThumbnail'
export const Attachment: FunctionComponent<Props> = ({
  name,
  explanationPosition,
  type
}) => {

  const pickRibbonColor = (type: string, name: string) => {
    switch (type) {
      case AttachmentType.audio:
        return audioRed
      case AttachmentType.document:
        if (name.endsWith(".docx")) { return docxBlue }
        if (name.endsWith(".pdf")) { return pdfRed }
        if (name.endsWith(".xlsx")) { return sheetsGreen }
        return documentBlue
      case AttachmentType.image:
        return veryLightGrey
      case AttachmentType.video:
        if (name.endsWith(".avi")) { return darkGrey }
        return veryLightGrey
      case AttachmentType.other:
        if (name.endsWith(".zip") || name.endsWith(".rar")) {
          return archiveWhite
        }
        return veryLightGrey
      default:
        return veryLightGrey
    }
  }

  const renderIcon = (type: string, name: string) => {
    switch (type) {
      case AttachmentType.audio:
        return <Icon icon={AudioIcon}/>
      case AttachmentType.document:
        if (name.endsWith(".docx")) { return <Icon icon={WordIcon}/> }
        if (name.endsWith(".pdf")) { return <Icon icon={PDFIcon}/> }
        if (name.endsWith(".xlsx")) { return <Icon icon={ExcelIcon}/> }
        return <Icon icon={DocsIcon}/>
      case AttachmentType.image:
        return <Icon icon={ImageIcon}/>
      case AttachmentType.video:
        return <Icon icon={VideoIcon}/>
      case AttachmentType.archive:
        return <Icon icon={ArchiveIcon}/>
      case AttachmentType.other:
        return <Icon icon={OtherIcon}/>
      default:
        return <Icon icon={OtherIcon}/>
    }
  }

  const renderThumbnail = (type: string, name: string) => {
    switch (type) {
      case AttachmentType.audio:
          return <Thumbnail sheet={ThumbnailSheet} x={-63} y={-47}/>
      case AttachmentType.video:
          return <Thumbnail sheet={ThumbnailSheet} width={44} x={-260} y={-110}/>
      case AttachmentType.image:
          return <Thumbnail sheet={ThumbnailSheet} x={-96} y={0}/>
      case AttachmentType.archive:
          return <Thumbnail sheet={ThumbnailSheet} x={-88} y={-88}/>
      case AttachmentType.document:
        if (name.endsWith(".docx")) { return <Thumbnail sheet={ThumbnailSheet} x={0} y={-88}/> }
        if (name.endsWith(".pdf")) { return <Thumbnail sheet={ThumbnailSheet} x={-164} y={-47}/> }
        if (name.endsWith(".xlsx")) {  return <Thumbnail sheet={ThumbnailSheet} x={0} y={0}/> }
        return <Thumbnail sheet={ThumbnailSheet} x={-121} y={-47}/>
      case AttachmentType.other:
          return <Thumbnail sheet={ThumbnailSheet} x={-219} y={-88}/>
      default:
          return <Thumbnail sheet={ThumbnailSheet} x={-219} y={-88}/>
    }
  }

  return (
    <Wrapper data-explanation={explanationPosition}>
      <Hovered>
          <HoveredMetadata>
            <HoveredIconNameWrapper>
	      {renderIcon(type, name)}
              <HoveredName>
                {name}
              </HoveredName>
            </HoveredIconNameWrapper>
            <div>
              {randomizeFileSize()}
            </div>
          </HoveredMetadata>
          <HoveredButtonsContainer>
              <HoveredButton>
                <DownloadIcon>
                  <MdOutlineFileDownload size={25} aria-hidden="true" />
                </DownloadIcon>
            </HoveredButton>
            <HoveredButton>
              <GoogleDriveAddIcon>
                <AddToDriveIcon />
              </GoogleDriveAddIcon>
            </HoveredButton>
          </HoveredButtonsContainer>
      </Hovered>
      <Preview>
        {renderThumbnail(type, name)}
      </Preview>
      <Unhovered>
        <Name>
	  <UnhoveredWrapper>
            {renderIcon(type, name)}
            <span>
              {name}
            </span>
          </UnhoveredWrapper>
          <RibbonContainer>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 10" width="46px">
              <path id="ribbon" fill={pickRibbonColor(type, name)} stroke="none" d="M11,10 L11,0 L19,0 L19,10"/>
              <path id="ribbon" fill={leftRibbonGrey} stroke="none" d="M0,10 L10,10 L10,0"/>
              <path id="ribbon" fill="white" stroke="none" d="M20,10 L20,-1 L10,12"></path>
            </svg>
          </RibbonContainer>
        </Name>
      </Unhovered>

    </Wrapper>
  )
}

const UnhoveredWrapper = styled.div`
  margin-top: -5px;
  display: flex;
  align-items: center;
  gap: 3px;
`

const RibbonContainer = styled.div`
  margin-left: auto;
  margin-bottom: -5px;
  margin-right: -2px;
`

const Wrapper = styled.div`
  width: 178px;
  height: 113px;
  cursor: pointer;
  position: relative;
`

const Thumbnail = styled("div")<{sheet: string, x: number, y: number, width?: number}>`
  background: no-repeat url(${props => props.sheet}) ${props => props.x}px ${props => props.y}px;
  width: ${props => props.width || 40}px;
  height: 40px;
  border: 0;
`

const HoveredIconNameWrapper = styled.div`
 margin-bottom: 5px;
 display: flex;
 align-items: center;
 gap: 3px;
`

// needs to be hidden 
const Unhovered = styled.div`
  display: block;
  ${Wrapper}:hover & {
    display: none;
  }
`

const Preview = styled.div`
  padding-top: 0rem;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #F0F0F0;
  border-bottom: none;
`

const Name = styled.div`
  display: flex;
  padding: 8px 0 0 4px;
  border: 1px solid #F0F0F0;  
  align-items: center;
  background: #F0F0F0;
  color: #888;
  font-weight: bold;
    font-size: 12px;
  > span {
    color: #7f7e7e;
    font-weight: bold;
    font-size: 12px;
  }
`

const Hovered = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  width: 178px;
  height: 118px;
  display: none;
  background: #555;
  opacity: 1.0;
  padding-top: 12px;
  box-sizing: border-box;

  ${Wrapper}:hover & {
    display: block;
  }
`

const HoveredName = styled.span`
  color: white;
  font-weight: bold;
  font-size: 12px;
`
const HoveredMetadata = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1px 8px;
  div:nth-of-type(2) {
    color: white;
    padding-left: 24px;
    font-size: 10px;
  }
`

const Icon = styled('div')<{icon: string}>`
  display: inline-block;
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
  width: 16px;
  height: 16px;
  padding-right: 8px;
`

const DownloadIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;

  > svg {
    display: block;
  }
`

const HoveredButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-left: 24px;
  padding-top: 25px;
`

const GoogleDriveAddIcon = styled.svg`
  padding: 4px;
  width: 25px;
  height: 25px;
  display: block;
  flex-shrink: 0;
  fill: currentColor;
`

const HoveredButton = styled.div`
  background: grey;
  color: white;
  width: min-content;
  height: min-content;
  border-radius: 0.25rem;
`

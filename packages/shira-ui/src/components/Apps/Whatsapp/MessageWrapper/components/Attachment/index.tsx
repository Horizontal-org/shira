import { FunctionComponent } from "react";
import { styled } from '@shira/ui'
import Document from '../../assets/document.png'
import DownloadIcon from '../../../Icons/Download'

interface Props {
  name: string,
  explanationPosition?: string
}

export const Attachment: FunctionComponent<Props> = ({ name, explanationPosition }) => {

  return (
    <Wrapper>
        <Card>
          <div>
            <ImageWrapper src={Document}/>
            <Name data-explanation={explanationPosition}>
              { name }
            </Name>
            <Download>
              <DownloadIcon />
            </Download>
          </div>
          <span>00:00</span>
        </Card>
    </Wrapper>    
  )
}

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

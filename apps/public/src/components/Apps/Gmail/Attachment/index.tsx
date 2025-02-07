import { FunctionComponent } from 'react'
import { styled } from '@horizontal-org/shira-ui'
import { RiFileFill } from 'react-icons/ri'

interface Props {
  position: string;
  name: string;
  explanationPosition: string | null;
}

export const Attachment: FunctionComponent<Props> = ({
  name,
  explanationPosition
}) => {
  return (
    <Wrapper>
      <Hovered>
        <Name>      
          <RiFileFill 
            size={16}
            color='#15c'
          />
          <span>
            {name}
          </span>
        </Name>
      </Hovered>
      <div>
        <Preview>
          <RiFileFill 
            size={40}
            color='#F0F0F0'
          />
        </Preview>
        <Name>      
          <RiFileFill 
            size={16}
            color='#15c'
          />
          <span 
            data-explanation={explanationPosition} 
          >
            {name}
          </span>
        </Name>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 178px;
  height: 113px;
  cursor: pointer;
  position: relative;
`

const Preview = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #F0F0F0;
`

const Name = styled.div`
  display: flex;
  padding: 4px 8px;
  border: 1px solid #F0F0F0;  
  align-items: center;
  background: #F0F0F0;
  > span {
    padding-left: 4px;
    color: #222;
    font-size: 12px;
  }
`

const Hovered = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  width: 178px;
  height: 113px;
  display: none;
  background: #F0F0F0;
  padding-top: 12px;
  box-sizing: border-box;

  ${Wrapper}:hover & {
    display: block;
  }
`
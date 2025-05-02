import { FunctionComponent } from 'react'
import { styled } from '@shira/ui'
import { Attachment } from '../Attachment';

interface Props {
  data: {
    name: string;
    position: string;
    explanationPosition: string | null;
  }[],
}

export const Attachments: FunctionComponent<Props> = ({
  data,
}) => {

  return (
    <Wrapper>
    <div>
      <Title>{`${data.length} attachment${data.length > 1 ? 's' : ''}`}</Title>
      <Point>•</Point>
      <Subtitle>Scanned by Google</Subtitle>
    </div>
      <AttachmentWrapper>
        { data.sort((a, b) => parseInt(a.position) - parseInt(b.position)).map((d) => (
          <Attachment
            key={d.name}
            name={d.name}
            position={d.position}
            explanationPosition={d.explanationPosition}
          />
        ))}
      </AttachmentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 8px;
  width: 100%;
  border-top: 1px dotted #d8d8d8;
`

const Title = styled.div`
  display: inline-block;
  font-size: .875rem;
  letter-spacing: normal;
  height: 20px;
  line-height: 20px;
  font-weight: bold;
`

const Point = styled.div`
  display: inline-block;
  padding: 0 6px;
`

const Subtitle = styled.div`
  display: inline-block;
  font-size: .875rem;
  letter-spacing: normal;
  height: 20px;
  line-height: 20px;
  font-weight: 400;
`

const AttachmentWrapper = styled.div`
  display: flex;
  padding-top: 12px;
  > div {
    margin-right: 8px;
  }
`
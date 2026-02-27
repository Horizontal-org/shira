import {  
  Body1,
  Button,
  H1,
  styled,
} from "@shira/ui";
import FullFish from './assets/FullFish'
import { useStore } from "../../../../store";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";

export const CreateSpaceSuccess = () => {

  const navigate = useNavigate()
  const {
    user,    
  } = useStore((state) => ({
    user: state.user,
  }), shallow)

  return (
    <Wrapper>
      <SvgWrapper>
        <FullFish />
      </SvgWrapper>
      <TextContent>
        <H1>All done!</H1>
        <Body1>
          <strong>Your space was successfully created. Log in to start creating quizzes.</strong>
        </Body1>
        <div>
          <Button
            text="Go to space"
            disabled={!user}
            type="outline"
            onClick={() => {
              navigate('/')
            }}
          />
        </div>
      </TextContent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;  
  width: 1120px;

  @media(max-width: ${props => props.theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const SvgWrapper = styled.div`
  > svg {
    width: 500px;
    
    @media(max-width: ${props => props.theme.breakpoints.sm}) {
      > svg {
      width: 100%;
      }
    }
  }
`
import { FunctionComponent } from "react"
import { Body1, styled, H1, Button } from "@shira/ui"
import FishTail from '../../../assets/FishTail'
import { CustomQuizNavbar } from "../CustomQuizNavbar"
import { SceneWrapper } from "../SceneWrapper"

interface Props {
  title: string;
  description: string;
  homeButtonText: string;
}

export const InvalidLink: FunctionComponent<Props> = ({ title, description, homeButtonText }) => {
  return (
    <CustomSceneWrapper>
      <CustomQuizNavbar color="#DBE3A3"/>
      
      <Body>
        <Content>
          <div>
            <StyledH1>{title}</StyledH1>
            <Body1>
              <strong>{description}</strong>
            </Body1>
            <ButtonWrapper>
              <Button 
                text={homeButtonText}
                type="outline"
                onClick={() => {
                  window.location.href = "https://shira.app";
                }}
              />
            </ButtonWrapper>
          </div>
          <SvgWrapper>
            <FishTail />
          </SvgWrapper>
        </Content>
      </Body>

      <Backshot />
    </CustomSceneWrapper>
  )
}

const CustomSceneWrapper = styled(SceneWrapper)`
  background: white;
  position: relative;  
`

const Body = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  z-index: 2;  
  width: 1120px;
  display: flex;

  @media(max-width: ${props => props.theme.breakpoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
`

const SvgWrapper = styled.div`
  > svg {
    width: 500px;
  }

  @media(max-width: ${props => props.theme.breakpoints.sm}) {
    > svg {
     width: 100%;
    }
  }
`

const StyledH1 = styled(H1)`
  padding-top: 45px;
  padding-bottom: 18px;
  
  @media(max-width: ${props => props.theme.breakpoints.md}) {
    padding-top: 0;
  }
  
`

const ButtonWrapper = styled.div`
  padding-top: 18px;
`

const Backshot = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  background: linear-gradient(180deg, #D5F2FF 0%, #69C2E8 100%);
  height: 480px;
  width: 100%;
`
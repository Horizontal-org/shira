import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";
import { styled, Button } from '@shira/ui';
import { FeedbackBox } from "../../components/UI/FeedbackBox";
import { Footer } from "../../components/UI/Footer";
import { SceneWithFooter } from "../../components/UI/SceneWithFooter";
import { SceneWrapper } from "../../components/UI/SceneWrapper";
import { Section } from "../../components/UI/Section";
import { CreateSurvey } from "../../domain/survey";
import { submitFeedback } from "../../fetch/feedback";
import { useToast } from "../../hooks/useToast";
import { useStore } from "../../store";
import useGetWidth from "../../hooks/useGetWidth";

interface Props {}

export const Feedback: FunctionComponent<Props> = () => {
  const { t } = useTranslation()
  const { width } = useGetWidth()
  const changeScene = useStore((state) => state.changeScene)
  const { createToast } = useToast()

  const [easyness, onEasyness] = useState('')
  const [recommend, onRecommend] = useState('')
  const [improve, onImprove] = useState('')

  const handleSubmitFeedback = async() => {                  
    if (easyness.length > 0 || recommend.length > 0 || improve.length > 0) {
      const data: CreateSurvey = {
        easyness: easyness.length > 0 ? easyness : null,
        recommend: recommend.length > 0 ? recommend : null,
        improvements: improve.length > 0 ? improve : null,
      }

      const success = await submitFeedback(data)
      if (success) {
        createToast('Thanks for your feedback!')
      }                    
    }

    changeScene('completed') 
  }

  return (
    <SceneWrapper>
      <SceneWithFooter>

        <Box>
          <Section title={ t('feedback.title') } size="lg">
            <FeedbackHeading>
              <FeedbackSubtitle>
              { t('feedback.subtitle') }
              </FeedbackSubtitle>
            </FeedbackHeading>

            <FeedbackBox 
              easyness={easyness}
              recommend={recommend}
              improve={improve}
              onEasyness={onEasyness}
              onRecommend={onRecommend}
              onImprove={onImprove}
            />

          </Section>
        </Box>


        <Footer 
          title=""
          action={(
            <FooterActionWrapper>
              {width > 768 && (
                <p>{ t('feedback.footer_title') }</p>
              )}
              <Button 
                text={ t('feedback.next_button') }
                rightIcon={<FiChevronRight size={18}/>}          
                onClick={handleSubmitFeedback}
                type="primary"
                size={width > 768 ? 'sm' : 'lg'}     
              />
            </FooterActionWrapper>
          )}
        />
      </SceneWithFooter>
    </SceneWrapper>
  )
}

const FooterActionWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
  padding-left: 50px;
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    padding-left: 0;
  }
`

const FeedbackSubtitle = styled.div`
  font-weight: 300;
  font-size: 21px;
  line-height: 32px;
  color: #404040;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
  }
`

const FeedbackHeading = styled.div`
  flex-shrink: 1;
  padding-right: 40px;
`

const Box = styled.div`
  
  @media (min-width: ${props => props.theme.breakpoints.xs}) {
    margin-top: 40px;
  }

  >div>div{
    @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height:860px) {
      height: 71vh;
    }

    @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
      height: calc(100vh - 116px);
      width: 100vw;
    }
  }

  >div {
    @media(min-width: ${props => props.theme.breakpoints.md}) and (max-height: 680px) {
      margin-top: 0;
    }
  }

  @media(max-width: ${props => props.theme.breakpoints.xs}) {
    h2{
      color: ${props => props.theme.colors.green6};
      font-size: 40px;
    }
`
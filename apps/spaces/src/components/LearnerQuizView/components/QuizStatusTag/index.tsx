import { styled, useTheme } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from "react-icons/io5";

interface Props {
  status: string
}

export const QuizStatusTag:FunctionComponent<Props> = ({
  status
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  if (status === 'completed') {
    return (
      <Wrapper 
        customBackground={theme.colors.light.paleGreen}
        customColor={theme.colors.green9}
      >
        <div>
          <IoCheckmarkCircleSharp size={12} color={theme.colors.green6}/>
          <span>{ t('learners.table.submited_tag')}</span>
        </div>
      </Wrapper>
    )
  } 

  if (status !== 'completed') {
    return (
      <Wrapper 
        customColor={theme.colors.error9}
        customBackground={theme.colors.light.paleRed}
      >
        <div>
          <IoCloseCircleSharp size={12} color={theme.colors.error9}/>
          <span>{ t('learners.table.not_submited_tag')}</span>
        </div>
      </Wrapper>
    )
  } 
}

const Wrapper = styled.div<{ customColor: string; customBackground: string }>`
  display: inline-block;

  > div {
    display: flex;
    align-items: center;
    padding: 4px;
    gap: 4px;
    background: ${props => props.customBackground};  
    border-radius: 2px;
    
    > span { 
      color: ${props => props.customColor};
    }      
  }
`
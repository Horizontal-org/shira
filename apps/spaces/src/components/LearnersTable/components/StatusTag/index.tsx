import { styled, useTheme } from "@shira/ui";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

interface Props {
  status: string
}

export const StatusTag:FunctionComponent<Props> = ({
  status
}) => {
  const { t } = useTranslation()
  const theme = useTheme()

  if (status === 'registered') {
    return (
      <Wrapper 
        customBackground={theme.colors.light.paleGreen}
        customColor={theme.colors.green9}
      >
        <div>
          <IoCheckmarkCircleSharp size={12} color={theme.colors.green6}/>
          <span>{ t('learners.table.registered_tag')}</span>
        </div>
      </Wrapper>
    )
  } 

  if (status === 'invited') {
    return (
      <Wrapper 
        customColor={theme.colors.dark.darkGrey}
        customBackground={theme.colors.light.paleGrey}
      >
        <div>
          <AiOutlineClockCircle size={12} color={theme.colors.dark.darkGrey}/>
          <span>{ t('learners.table.invited_tag')}</span>
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
import { FunctionComponent } from "react";
import { styled } from '@horizontal-org/shira-ui'

// Icons
import GmailSvg from './assets/Mail'
import WhatsappSvg from './assets/Whatsapp'
import MessengerIcon from './assets/Messenger'
import DatingAppIcon from "./assets/DatingApp";
import SmsIcon from "./assets/Sms";


const icons = {
  'Whatsapp': <WhatsappSvg />,
  'Gmail': <GmailSvg />,
  'Messenger': <MessengerIcon />,
  'Dating App': <DatingAppIcon />,
  'SMS': <SmsIcon />,
}

const getIcon = (name) => {
  return icons[name]
}

interface Props {
  id?: string;
  name: string;
  selected: boolean;
  onClick?: () => void
}

export const AppItem: FunctionComponent<Props> = ({ 
  id, 
  name, 
  selected, 
  onClick
}) => { 
  return (
    <Wrapper selected={selected}>
      <Box onClick={onClick} name={name.toLowerCase().replace(/\s/g, '')}>
        { getIcon(name) }
      </Box>
      <span>{name}</span>
    </Wrapper>
  )
}

interface BoxProps {
  name: string;
}

const Wrapper = styled.div<{ selected: boolean }>`
  text-align: center;
  opacity: 0.55;
  border: 2px solid transparent;
  padding-bottom: 8px;

  ${props => props.selected && `
    border: 2px solid #000;
    opacity: 1;
  `}
`
const Box = styled.div<BoxProps>`
  height: 120px;
  width: 120px;
  cursor: pointer;
  background: ${props => props.theme.apps[props.name]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > svg {
    height: 55px;
    width: 55px;
  } 

  > span {
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
    color: ${props => props.theme.secondary.dark.darkGrey};
    padding-top: 8px;
  }

  margin-bottom: 8px;

  @media (max-width:  ${props => props.theme.breakpoints.sm}) {
    height: 96px;
    width: 96px;
  }
`

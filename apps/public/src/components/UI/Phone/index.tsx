import { FunctionComponent, ReactNode } from 'react'
import { styled, createGlobalStyle } from '@horizontal-org/shira-ui'
import { lighten } from 'polished'
import Battery from './Icons/BatteryIcon'
import Signal from './Icons/SignalIcon'
import WiFi from './Icons/WiFiIcon'
interface Props {
  children: ReactNode,
  className: string,
  background: string
}

export const Phone: FunctionComponent<Props> = ({ children, className, background }) => {
  return (
    <DesktopWrapper>
      <Font />
      <Mobile background={background} className={className}>
        <Header>
          <div>9:30</div>
          <FlexWrapper>
            <WiFi />
            <Signal />
            <IconWrapper>
              <Battery />
            </IconWrapper>
          </FlexWrapper>
        </Header>
        { children }
      </Mobile>
    </DesktopWrapper>
  )
}

const Font = createGlobalStyle`
  .android {
    font-family: 'Product Sans Regular';
  }
`

const DesktopWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => lighten('0.4', props.theme.secondary.base)};
  display: flex;
  justify-content: center;
  align-items: center;
`

interface PhoneProps {
  background: string
}

const Header = styled.div`
  padding: 8px 24px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5F6368;
  font-weight: 500;
  font-size: 14px;
`

const IconWrapper = styled.div`
  height: 15px;
  padding-left: 4px;
`

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Mobile = styled('div')<PhoneProps>`
  box-sizing: border-box;
  height: 80vh;
  aspect-ratio: 1/2;
  background: ${props => props.background};
  border-radius: 50px;
  border: 17px solid #F3F3F3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) and (max-height: 860px) {
    width: 90%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: 0;
    border: none;
    height: 100%;
    width: 100%;
  }
`
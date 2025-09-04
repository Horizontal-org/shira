import { cloneElement, FunctionComponent, ReactElement, useState} from 'react'
import styled from 'styled-components'
import { FloatingFocusManager, safePolygon, useFloating, useHover, useInteractions } from '@floating-ui/react';
import { SenderIcon } from './SenderIcon';

import ChevronDown from '../../../../globalIcons/ChevronDown'
import MoreHorizontal from '../../../icons/MoreHorizontal'
import Call from '../../../icons/Call'
import Mail from '../../../icons/Mail'
import Linkedin from '../../../icons/Linkedin'
import { Contact } from './Contact';

interface Props {
  senderName: string;
  senderEmail: string;
  children: ReactElement
}

export const SenderFloatingInfo:FunctionComponent<Props> = ({
  senderName,
  senderEmail,
  children
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
  })

  const hover = useHover(context, {
    delay: 300,
    handleClose: safePolygon({
      requireIntent: false,
    }),
  })
  const {getReferenceProps, getFloatingProps} = useInteractions([
    hover,
  ])

  return (
    <>
      { cloneElement(children, { ref: refs.setReference, ...getReferenceProps } ) }
      { isOpen && (
        <FloatingFocusManager 
          context={context} 
          modal={false}
          returnFocus={false}
          initialFocus={-1}
          restoreFocus={false}
        >
          <div
            ref={refs.setFloating} 
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <Wrapper>
              <SenderMain>
                <StyledSenderIcon>
                  { senderName.charAt(0) }
                </StyledSenderIcon>
                <SenderName>
                  { senderName }
                </SenderName>
              </SenderMain>
              <SenderActions>
                <CallButton>
                  <LeftCallButton>
                    <Call />
                    <span>Call</span>
                  </LeftCallButton>
                  <RightCallButton>
                    <ChevronDown />
                  </RightCallButton>
                </CallButton>
                <SenderActionIconWrapper>
                  <Mail />
                </SenderActionIconWrapper>
                <SenderActionIconWrapper>
                  <Linkedin />
                </SenderActionIconWrapper>
                <SenderActionIconWrapper>
                  <MoreHorizontal />
                </SenderActionIconWrapper>
              </SenderActions>
              <Separator />
              <Contact senderEmail={senderEmail}/>
            </Wrapper>
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}

const Wrapper = styled.div`
  width: 340px;  
  z-index: 2;
  background: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
  border-radius: 4px;

  &:focus {
    outline: !important none;
  }
`

const SenderMain = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0 0 16px;
`

const StyledSenderIcon = styled(SenderIcon)`
  font-size: 28px;
  height: 72px;
  width: 72px;
  font-weight: 600;
  background: rgb(122, 117, 116);
  color: white;
`

const SenderName = styled.div`
  padding-left: 8px;
  text-overflow: ellipsis;
  white-space: nowrap; 
  font-weight: 600;
  color: #242424;
  font-size: 20px;
  font-weight: 600;
  max-width: 176px;
  cursor: text;
`

const SenderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  padding: 0 0 16px 16px;
`

const CallButton = styled.div`
  display: flex;
  height: 32px;
  cursor: pointer;
  padding-right: 4px;
`

const LeftCallButton = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  background: #0F6CBD;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  border-right: 1px solid white;
  padding: 0 9px 0 9px;
  color: white;

  > span {
    padding-left: 6px; 
    padding-right: 2px;
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 1px;
  }

  &:hover {
    background: #0F548C;
  }
`

const RightCallButton = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  background: #0F6CBD;
  border-radius: 0 4px 4px 0;

  &:hover {
    background: #0F548C;
  }
`

const SenderActionIconWrapper = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }

  > svg {
    fill: #424242; 
  }
`

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #e0e0e0;
`
// ent.style {
// }
// <style>
// .primaryText-479 {
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
//     -webkit-font-smoothing: antialiased;
//     font-size: 20px;
//     font-weight: 600;
//     color: var(--neutralDark);
//     line-height: 27px;
//     margin: 0px 0px 2px;
//     max-width: 176px;
//     cursor: text;
// }
      // :host{
      //   --lpcCardWidth:340px;
      //   --lpcCardHeight:540px;
      // }
      // #root{
      //   width:var(--lpcCardWidth);
      //   height:var(--lpcCardHeight);
      //   border-radius:var(--lpcBorderRadius, 4px);
      //   box-shadow:var(--lpcBoxShadow, 0 0 5px 0 rgba(0, 0, 0, 0.4));
      //   overflow:hidden;
      //   position:fixed;
      //   contain:size layout style
      // }
      // #modal-background{
      //   background:gray;
      //   width:100vw !important;
      //   height:100vh !important;
      //   position:fixed;
      //   opacity:0;
      //   z-index:-1;
      // }
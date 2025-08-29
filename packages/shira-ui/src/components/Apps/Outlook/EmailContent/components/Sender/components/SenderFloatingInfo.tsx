import { cloneElement, FunctionComponent, ReactElement, ReactNode, useState} from 'react'
import styled from 'styled-components'
import { autoUpdate, FloatingFocusManager, useFloating, useHover, useInteractions } from '@floating-ui/react';
import { SenderIcon } from './SenderIcon';

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
  const [isOpen, setIsOpen] = useState(true);
  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    // whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context)
 
  const {getReferenceProps, getFloatingProps} = useInteractions([
    hover,
  ])

  return (
    <>
      { cloneElement(children, { ref: refs.setReference, ...getReferenceProps } ) }
      { isOpen && (
        <FloatingFocusManager context={context} modal={false}>
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
            </Wrapper>
          </div>
        </FloatingFocusManager>
      )}
    </>
  )
}

const Wrapper = styled.div`
  width: 340px;
  padding: 16px;
  z-index: 2;
  background: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`

const SenderMain = styled.div`
  display: flex;
  align-items: center;
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
  padding-left: 12px;
  text-overflow: ellipsis;
  white-space: nowrap; 
  font-weight: 600;
  color: #242424;
  font-size: 20px;
  font-weight: 600;
  max-width: 176px;
  cursor: text;
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
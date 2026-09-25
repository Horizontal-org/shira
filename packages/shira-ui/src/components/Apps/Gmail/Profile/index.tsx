import { FunctionComponent, useState } from "react";
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import ProfileIcon from './assets/profile.png'
import { IoMdArrowDropdown, IoMdLock } from "react-icons/io";
import { autoUpdate, FloatingFocusManager, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";

interface CustomElements {
  textContent: string,
  explanationPosition: string | null
}

interface Props {
  senderName: CustomElements;
  senderEmail: CustomElements;
  receiverName?: string;
  receiverEmail?: string;
  subject: string;
}

export const Profile: FunctionComponent<Props> = ({
  senderName,
  senderEmail,
  receiverName,
  receiverEmail,
  subject
}) => {
  const { t } = useTranslation('shira-ui')

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start'
  })

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    click,
    role
  ]);

  return (
    <ProfileWrapper>
      <Icon>
        <img src={ProfileIcon} alt='profile-pic' />
      </Icon>
      <SenderWrapper>
        <Sender>
          <SenderName
            data-explanation={senderName.explanationPosition}
          >
            {senderName.textContent || ''}
          </SenderName>
          <SenderEmail
            data-explanation={senderEmail.explanationPosition}
          >
            {`<${senderEmail.textContent || ''}>`}
          </SenderEmail>
        </Sender>
        <Receiver>
          <span>{t('gmail.to_me')}</span>
          <ArrowWrapper
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            <IoMdArrowDropdown size={14} color="#666" />
          </ArrowWrapper>
          {isOpen && (
            <FloatingFocusManager context={context} modal={false}>
              <MessageInfoBox
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <div>
                  <BoxLeftInfo>{t('gmail.from')}</BoxLeftInfo>
                  <BoxRightInfo>
                    <strong>{senderName.textContent || ''}</strong>
                    <span style={{ color: '#5e5e5e' }}>{`<${senderEmail.textContent || ''}>`}</span>
                  </BoxRightInfo>
                </div>
                {receiverEmail && receiverName && (
                  <div>
                    <BoxLeftInfo>{t('gmail.to')}</BoxLeftInfo>
                    <BoxRightInfo>
                      <strong>{receiverName}</strong>
                      <span style={{ color: '#5e5e5e' }}>{`<${receiverEmail}>`}</span>
                    </BoxRightInfo>
                  </div>
                )}
                {subject && (
                  <div>
                    <BoxLeftInfo>{t('gmail.subject')}</BoxLeftInfo>
                    <BoxRightInfo>{subject}</BoxRightInfo>
                  </div>
                )}
                <div>
                  <BoxLeftInfo>{t('gmail.security')}</BoxLeftInfo>
                  <BoxRightInfo>
                    <IoMdLock size={14} color="#666" />
                    {t('gmail.encryption')}{" "}
                    <LearnMoreText
                      href="https://support.google.com/mail?hl=en-GB&p=tls"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => {
                        event.preventDefault()
                      }}
                      onContextMenu={(event) => {
                        event.preventDefault()
                      }}
                    >
                      {t('gmail.learn_more')}
                    </LearnMoreText>
                  </BoxRightInfo>
                </div>
              </MessageInfoBox>
            </FloatingFocusManager>
          )}
        </Receiver>
      </SenderWrapper>
    </ProfileWrapper>
  )
}

const SenderWrapper = styled.div`
  padding-inline-start: 12px;
  
`

const Icon = styled.div`
  height: 40px;
  width: 40px;
  cursor: pointer;
  > img {
    border-radius: 50%;      
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-inline-start: 8px;
  }
`

const Sender = styled.div`
  display: flex;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const Receiver = styled.div`
  display: flex;
  align-items: center;

  > span {
    color: #5e5e5e;
    font-size: .75em;
    font-weight: 400;
    margin-inline-end: 2px;
  }
`

// hide when mobile
const ArrowWrapper = styled.div`
  height: 16px;
  width: 16px;
  max-height: 16px;
  max-width: 16px;
  
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: rgba(32,33,36,.06);
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const MessageInfoBox = styled.div`
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,.2);
  border: 1px solid rgba(0,0,0,.2);
  padding: 10px 5px;
  z-index: 2;
  font-size: .75em;

  &:focus {
    outline: none;
  }
`

const BoxLeftInfo = styled.span`
  display: inline-block;
  color: #999;
  width: 55px;
  text-align: end;
  padding-top: 2px;
  padding-inline-end: 16px;
  padding-bottom: 2px;
  padding-inline-start: 20px;
`

const BoxRightInfo = styled.span`
  color: #222;
  text-wrap: wrap;
  padding-top: 2px;
  padding-inline-end: 40px;
  

  > strong {
    padding-inline-end: 4px;
  }

  > svg {
    vertical-align: sub;
    margin-inline-end: 4px; 
  }
`

const LearnMoreText = styled.a`
  color: #1155cc;
  text-decoration: underline;
  cursor: pointer;
`

const SenderName = styled.span`
  color: #1f1f1f;
  line-height: 20px;
  font-size: .875rem;
  font-weight: bold;
  padding-inline-end: 8px;
`

const SenderEmail = styled.span`
  color: #5e5e5e;
  line-height: 20px;
  font-size: .75rem;
  padding-inline-start: 4px;
  font-weight: 400;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-inline-start: 0;
  }
`

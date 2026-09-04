import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import MoreOptionsIcon from '../../../Icons/MoreOptions'
import SearchIcon from '../../../Icons/Search'
import BackArrow from '../../../Icons/BackArrow'
import StrangerPicture from '../../../StrangerPicture'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
  onContactClick: () => void
}

const Recipient:FunctionComponent<Props> = ({ phone, onContactClick }) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <PictureWrapper>
        <BackArrowWrapper>
          <BackArrow/>
        </BackArrowWrapper>

        <Contact>
          <ContactButton type="button" onClick={onContactClick} aria-label={t('whatsapp.view_contact_information')}>
            <StrangerPicture />
          </ContactButton>
          <div>
            <PhoneButton type="button" data-explanation={phone?.explanationPosition} onClick={onContactClick}>
              {phone?.textContent || ''}
            </PhoneButton>
          </div>
        </Contact>
      </PictureWrapper>
      <div>
        <Icons>
          <IconWrapper>
            <SearchIcon />
          </IconWrapper>    
          <IconWrapper>
            <MoreOptionsIcon />
          </IconWrapper>
        </Icons>
      </div>
    </Wrapper>
  )
}

const Contact = styled.div`
  display: flex;
  align-items: center;

  > div {
    > button {
      font-size: 16px;
      margin-inline-start: 12px;
      position: relative;
    }
  }
`

const ContactButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #00a884;
    outline-offset: 2px;
  }
`

const PhoneButton = styled.button`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 4px 0;
  color: #111b21;
  font-family: inherit;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid #00a884;
  }
`

const Wrapper = styled.div`
  padding: 10px 16px;
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    background: #00a884;
  }
`

const Icons = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  margin: 0 4px;
  padding: 8px;
  cursor: pointer;
  transition: background-color .1s;
  border-radius: 50%;

  &:active {
    background: rgba(11,20,26,0.1);
    cursor: pointer;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    > svg {
      > path {
        fill: #fff;
      }
    }
  }
`

const BackArrowWrapper = styled.div`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: inline-block;
    padding-inline-end: 8px;
  }

`

const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
`

export default Recipient;

import { FunctionComponent } from 'react' 
import { styled } from '@shira/ui'
import Categories from './components/Categories'

import BluePencilImage from './assets/bluepencil.png'

interface Props {}

const Sidebar: FunctionComponent<Props> = () => {

  return (
    <Wrapper>
      <MailButtonWrapper>
        <NewMailButton>
          <BluePencil />
          <span>Compose</span>
        </NewMailButton>
      </MailButtonWrapper>

      <Categories />

    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-width: 238px;  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const MailButtonWrapper = styled.div`
  display: inline-block;
`

const NewMailButton = styled.div`
  background: #C2E7FF;
  display: flex;
  align-items: center;
  margin: 16px 8px;
  border-radius: 16px;
  color: #001d35;
  height: 56px;
  padding: 0 24px 0 0;
  min-width: 96px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  transition-property: box-shadow, min-width;
  transition-duration: 0.08s, 0.15s;
  transition-timing-function: linear, cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0s, 0s;
  cursor: pointer;

  > span {
    font-size: .875rem;
    letter-spacing: .25px;
  }


  &:hover {
    box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  }
`

const BluePencil = styled.div`
  background-image: url(${BluePencilImage});
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  height: 48px;  
  width: 48px;
`

export default Sidebar
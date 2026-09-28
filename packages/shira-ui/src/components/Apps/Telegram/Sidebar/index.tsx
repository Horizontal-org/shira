import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { LuCircleUser, LuPhone, LuMessageCircle, LuSettings } from 'react-icons/lu'
import Profile from './components/Profile'
import SearchBar from './components/SearchBar'
import MessagesPreview from './components/MessagesPreview'

interface Props {
  phone?: {
    textContent: string
    explanationPosition: string
  };
}

const Sidebar: FunctionComponent<Props> = ({ phone }) => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Profile />
      <SearchBar />
      <MessagesPreview phone={phone} />
      <TabBar>
        <Tab><LuCircleUser /></Tab>
        <Tab><LuPhone /></Tab>
        <Tab $active>
          <LuMessageCircle />
          <Badge>{t('telegram.unread_count')}</Badge>
        </Tab>
        <Tab><LuSettings /></Tab>
      </TabBar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  flex: 32%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #f1f1f2;
  border-inline-end: 1px solid #dcdcdc;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 40%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`

const TabBar = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 8px;
  border-top: 1px solid #dcdcdc;
`

const Tab = styled.div<{ $active?: boolean }>`
  position: relative;
  display: flex;
  cursor: pointer;

  > svg {
    width: 28px;
    height: 28px;
    color: ${props => props.$active ? '#3390ec' : '#8e8e93'};
  }
`

const Badge = styled.span`
  position: absolute;
  top: -8px;
  inset-inline-start: 16px;
  min-width: 20px;
  padding: 1px 6px;
  box-sizing: border-box;
  border-radius: 999px;
  border: 2px solid #f1f1f2;
  background: #ff3b30;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`

export default Sidebar

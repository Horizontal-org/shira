import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

interface Props { }

const Tabs: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <Tab active>{t('instagram.messages')}</Tab>
      <Tab>{t('instagram.requests')}</Tab>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 24px 12px;
`

const Tab = styled.span<{ active?: boolean }>`
  font-size: ${props => props.active ? '16px' : '15px'};
  font-weight: ${props => props.active ? 700 : 400};
  color: ${props => props.active ? '#000' : '#737373'};
`

export default Tabs

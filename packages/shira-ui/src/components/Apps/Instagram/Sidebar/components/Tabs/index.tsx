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
  gap: 20px;
  padding: 0 16px 12px;
`

const Tab = styled.span<{ active?: boolean }>`
  font-size: 16px;
  font-weight: ${props => props.active ? 700 : 400};
  color: ${props => props.active ? '#000' : '#8e8e93'};
`

export default Tabs

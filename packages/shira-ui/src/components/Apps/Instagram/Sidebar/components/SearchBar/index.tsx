import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { LuSearch } from 'react-icons/lu'

interface Props { }

const SearchBar: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <InputWrapper>
        <LuSearch />
        <span>{t('instagram.search')}</span>
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px 16px;
  display: flex;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 999px;
  height: 44px;
  flex: 1;
  padding: 0 16px;
  background: #efefef;

  > svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: #737373;
  }

  > span {
    margin-inline-start: 14px;
    font-size: 16px;
    color: #737373;
  }
`

export default SearchBar

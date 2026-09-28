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
        <span>{t('telegram.search')}</span>
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 4px 8px 10px;
  display: flex;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  height: 34px;
  flex: 1;
  padding: 0 12px;
  background: #fff;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06);

  > svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: #8e8e93;
  }

  > span {
    font-size: 15px;
    color: #8e8e93;
  }
`

export default SearchBar

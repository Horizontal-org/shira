import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SearchIcon from '../../../../Whatsapp/Icons/Search'

interface Props { }

const SearchBar: FunctionComponent<Props> = () => {
  const { t } = useTranslation('shira-ui')

  return (
    <Wrapper>
      <InputWrapper>
        <SearchIcon />
        <span>{t('instagram.search')}</span>
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px 12px;
  display: flex;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  height: 100%;
  flex: 1;
  padding: 8px;
  background: #efefef;

  > svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  > span {
    margin-inline-start: 8px;
    font-size: 14px;
    color: #8e8e93;
  }
`

export default SearchBar

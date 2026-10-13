import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Verified from '../../../Icons/Verified'

interface Props {
  data: Element
}

export const SharedPost: FunctionComponent<Props> = ({ data }) => {
  const { t } = useTranslation('shira-ui')

  const accountName = data.getAttribute('data-account-name') || ''
  const image = data.querySelector('img')

  return (
    <Wrapper>
      <AccountRow>
        <AccountName>{accountName}</AccountName>
        <Verified aria-label={t('instagram.verified')} />
      </AccountRow>
      {image && (
        <ImageWrapper dangerouslySetInnerHTML={{ __html: image.outerHTML }} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 85%;
  width: fit-content;
  background: #fff;
  border: 1px solid #efefef;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,.06);
`

const AccountRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;

  > svg {
    width: 14px;
    height: 14px;
  }
`

const AccountName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`

const ImageWrapper = styled.div`
  max-height: 260px;

  img {
    display: block;
    width: 100%;
    max-height: 260px;
    object-fit: cover;
  }
`

export default SharedPost

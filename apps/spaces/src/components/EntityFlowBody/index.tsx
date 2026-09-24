import { Box, styled } from '@horizontal-org/shira-ui'

export const EntityContainer = styled.div`
  padding: 48px 0;
`

export const EntityBodyWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const EntityBodyHeader = styled.div`
  padding-bottom: 12px;
`

export const EntityFlowBox = styled(Box)`
  position: relative;
  z-index: 1;
  padding: 48px;
  width: 1024px;
  box-sizing: border-box;
`
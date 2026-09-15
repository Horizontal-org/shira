//  <Container>
//         <ContentWrapper>
//           <div>
//             <ContentHeader id="content-header">
//               <Breadcrumbs
//                 active={step}
//                 items={[
//                   { text: t('create_question.tabs.question_info.tab_title') },
//                   { text: t('create_question.tabs.content.tab_title') },
//                   { text: t('create_question.tabs.preview.tab_title') }
//                 ]}
//               />
//               {step === 2 && (
//                 <ExplanationTitle id="explanation-title">
//                   <Body1>
//                     {t('create_question.tabs.preview.subtitle')}
//                   </Body1>
//                 </ExplanationTitle>
//               )}
//             </ContentHeader>

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
`
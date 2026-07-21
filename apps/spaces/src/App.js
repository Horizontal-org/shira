import styled from 'styled-components'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import { LoginLayout } from './components/LoginLayout';
import { CreateSpaceLayout } from './components/CreateSpaceLayout';
import { InvitationExpiredLayout } from './components/InvitationExpiredLayout';
import { DashboardLayout } from './components/DashboardLayout';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { useEffect } from 'react';
import { ManageQuestionLanguages } from './components/ManageQuestionLanguages';
import { Toaster, resolveValue } from 'react-hot-toast';
import { Body1, ThemeProvider } from '@horizontal-org/shira-ui';
import { QuizViewLayout } from './components/QuizViewLayout';
import { IoMdCheckmarkCircle } from 'react-icons/io'
import LogoutLayout from './components/LogoutLayout';
import { QuestionCreationLayout } from './components/QuestionCreationLayout';
import { QuestionEditLayout } from './components/QuestionEditLayout';
import { QuestionLibraryListLayout } from './components/QuestionLibraryListLayout';
import { QuizTemplatesListLayout } from './components/QuizLibraryListLayout';
import { LearnerBulkImportLayout } from './components/LearnerBulkImportLayout';
import { SupportLayout } from './components/SupportLayout';
import { SettingsLayout } from './components/SettingsLayout';
import './language/i18n';
import i18n from './language/i18n';
import { GetStartedLayout } from './components/GetStartedLayout';
import { LearnersLayout } from './components/LearnersLayout';
import { FeedbackButton } from './components/FeedbackButton';
import { ResetPasswordRequestLayout } from './components/ResetPasswordLayout/ResetPasswordRequestLayout';
import { SetNewPasswordLayout } from './components/ResetPasswordLayout/SetNewPasswordLayout';
import { ConfirmEmailUpdateLayout } from './components/ConfirmEmailUpdateLayout';
import { CheckoutSuccessRedirect } from './components/CheckoutSuccessRedirect';
import { TemplatesLayout } from './components/TemplatesLayout';
import { MySubmissionsLayout } from './components/MySubmissionsLayout';

function App() {

  const {
    user,
    fetching,
    me,
    showTranslationsScene,
    fetchLanguages
  } = useStore((state) => ({
    user: state.user,
    fetching: state.fetching,
    fetchLanguages: state.fetchLanguages,
    me: state.me,
    showTranslationsScene: state.showTranslationsScene
  }), shallow)

  useEffect(() => {
    me()
    fetchLanguages()

    const savedLang = localStorage.getItem('lang')
    if (savedLang) i18n.changeLanguage(savedLang)

    // always show banner after refresh
    localStorage.setItem('shira_hide_beta_banner', 'no')
  }, [])

  if (fetching) {
    return (
      <div>
        ...Loading
      </div>
    )
  }

  return (
    <ThemeProvider>
      <>
        <Wrapper hideOverflow={showTranslationsScene || false}>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<LoginLayout />} />
              <Route path='/confirm-email-update/:token' element={<ConfirmEmailUpdateLayout />} />
              <Route path='/reset-password' element={<ResetPasswordRequestLayout />} />
              <Route path='/reset-password/:token' element={<SetNewPasswordLayout />} />
              <Route path='/create-space/:passphraseCode' element={<CreateSpaceLayout />} />
              <Route path='/invitation-used' element={<InvitationExpiredLayout />} />
              <Route path='/get-started' element={<GetStartedLayout />} />
              <Route path='/checkout-success' element={<CheckoutSuccessRedirect />} />
              {user && (
                <>
                  <Route
                    element={(
                      <>
                        <Outlet />
                        <FeedbackButton />
                      </>
                    )}
                  >
                    <Route path="/" element={<DashboardLayout />} />
                    <Route path="/dashboard" element={<DashboardLayout />} />
                    <Route path='/quiz/:id' element={<QuizViewLayout />} />
                    <Route path='/quiz/:quizId/question' element={<QuestionCreationLayout />} />
                    <Route path='/quiz/:quizId/question/:questionId' element={<QuestionEditLayout />} />
                    <Route path='/quiz/templates' element={<QuizTemplatesListLayout />} />
                    <Route path='/question/library' element={<QuestionLibraryListLayout />} />
                    <Route path="/library" element={<TemplatesLayout />} />
                    <Route path="/library/my-submissions" element={<MySubmissionsLayout />} />
                    <Route path='/learner' element={<LearnersLayout />} />
                    <Route path='/learner/import/bulk' element={<LearnerBulkImportLayout />} />
                    <Route path="/logout" element={<LogoutLayout />} />
                    <Route path="/support" element={<SupportLayout />} />
                    <Route path="/settings" element={<SettingsLayout />} />
                  </Route>
                </>
              )}
            </Routes>
          </BrowserRouter>
        </Wrapper>
        <Toaster
          position="bottom-center"
        >
          {(t) => (
            <StyledToastBar
              style={{
                opacity: t.visible ? 1 : 0,
              }}
            >
              <IoMdCheckmarkCircle color='#658840' size={24} />
              <Body1>{resolveValue(t.message, t)}</Body1>
            </StyledToastBar>
          )}
        </Toaster>
        <ManageQuestionLanguages />
      </>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: ${props => props.hideOverflow ? 'hidden' : 'auto'}
  
`
const StyledToastBar = styled.div`
  border-radius: 20px;
  background: white;
  display: flex;
  padding: 16px;
  align-items: center;

  box-shadow: -1px 4px 4px -1px #00000040;
  
  > p {
    padding-left: 16px;
  }
`

export default App;

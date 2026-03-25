import styled from 'styled-components'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster, resolveValue } from 'react-hot-toast';
import { Body1, ThemeProvider } from '@shira/ui';
import { IoMdCheckmarkCircle } from 'react-icons/io'
import './language/i18n';

const LoginLayout = lazy(() => import('./components/LoginLayout').then(m => ({ default: m.LoginLayout })));
const CreateSpaceLayout = lazy(() => import('./components/CreateSpaceLayout').then(m => ({ default: m.CreateSpaceLayout })));
const InvitationExpiredLayout = lazy(() => import('./components/InvitationExpiredLayout').then(m => ({ default: m.InvitationExpiredLayout })));
const DashboardLayout = lazy(() => import('./components/DashboardLayout').then(m => ({ default: m.DashboardLayout })));
const QuizViewLayout = lazy(() => import('./components/QuizViewLayout').then(m => ({ default: m.QuizViewLayout })));
const LogoutLayout = lazy(() => import('./components/LogoutLayout'));
const QuestionCreationLayout = lazy(() => import('./components/QuestionCreationLayout').then(m => ({ default: m.QuestionCreationLayout })));
const QuestionEditLayout = lazy(() => import('./components/QuestionEditLayout').then(m => ({ default: m.QuestionEditLayout })));
const QuestionLibraryListLayout = lazy(() => import('./components/QuestionLibraryListLayout').then(m => ({ default: m.QuestionLibraryListLayout })));
const LearnerBulkImportLayout = lazy(() => import('./components/LearnerBulkImportLayout').then(m => ({ default: m.LearnerBulkImportLayout })));
const SupportLayout = lazy(() => import('./components/SupportLayout').then(m => ({ default: m.SupportLayout })));
const SettingsLayout = lazy(() => import('./components/SettingsLayout').then(m => ({ default: m.SettingsLayout })));
const GetStartedLayout = lazy(() => import('./components/GetStartedLayout').then(m => ({ default: m.GetStartedLayout })));
const LearnersLayout = lazy(() => import('./components/LearnersLayout').then(m => ({ default: m.LearnersLayout })));
const FeedbackButton = lazy(() => import('./components/FeedbackButton').then(m => ({ default: m.FeedbackButton })));
const ResetPasswordRequestLayout = lazy(() => import('./components/ResetPasswordLayout/ResetPasswordRequestLayout').then(m => ({ default: m.ResetPasswordRequestLayout })));
const SetNewPasswordLayout = lazy(() => import('./components/ResetPasswordLayout/SetNewPasswordLayout').then(m => ({ default: m.SetNewPasswordLayout })));
const ConfirmEmailUpdateLayout = lazy(() => import('./components/ConfirmEmailUpdateLayout').then(m => ({ default: m.ConfirmEmailUpdateLayout })));
const ManageQuestionLanguages = lazy(() => import('./components/ManageQuestionLanguages').then(m => ({ default: m.ManageQuestionLanguages })));

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
            <Suspense fallback={<div>...Loading</div>}>
            <Routes>
              <Route path='/login' element={<LoginLayout />} />
              <Route path='/confirm-email-update/:token' element={<ConfirmEmailUpdateLayout />} />
              <Route path='/reset-password' element={<ResetPasswordRequestLayout />} />
              <Route path='/reset-password/:token' element={<SetNewPasswordLayout />} />
              <Route path='/create-space/:passphraseCode' element={<CreateSpaceLayout />} />
              <Route path='/invitation-used' element={<InvitationExpiredLayout />} />
              <Route path='/get-started' element={<GetStartedLayout />} />
              {user && (
                <>
                  {/* LEGACY */}
                  {/* <Route path="/legacy-question" element={<QuestionLayout />} /> */}
                  {/* <Route path="/translations" element={<ManageGlobalLanguages />} /> */}
                  {/* <Route path="/legacy-questions" element={<HomeLayout />} /> */}
                  {/* <Route path="/question/:id"  element={<QuestionLayout />} />  */}
                  {/* LEGACY */}
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
                    <Route path='/question/library' element={<QuestionLibraryListLayout />} />
                    <Route path='/learner' element={<LearnersLayout />} />
                    <Route path='/learner/import/bulk' element={<LearnerBulkImportLayout />} />
                    <Route path="/logout" element={<LogoutLayout />} />
                    <Route path="/support" element={<SupportLayout />} />
                    <Route path="/settings" element={<SettingsLayout />} />
                  </Route>
                </>
              )}
            </Routes>
            </Suspense>
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

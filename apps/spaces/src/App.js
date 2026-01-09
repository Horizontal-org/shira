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
import { Body1, ThemeProvider } from '@shira/ui';
import { QuizViewLayout } from './components/QuizViewLayout';
import { IoMdCheckmarkCircle } from 'react-icons/io'
import LogoutLayout from './components/LogoutLayout';
import { QuestionCreationLayout } from './components/QuestionCreationLayout';
import { QuestionEditLayout } from './components/QuestionEditLayout';
import { QuestionLibraryListLayout } from './components/QuestionLibraryListLayout';
import { SupportLayout } from './components/SupportLayout';
import './language/i18n';
import { GetStartedLayout } from './components/GetStartedLayout';
import { LearnersLayout } from './components/LearnersLayout';
import { FeedbackButton } from './components/FeedbackButton';

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
            <Routes>
              <Route path='/login' element={<LoginLayout />} />
              <Route path='/create-space/:passphraseCode' element={<CreateSpaceLayout />} />
              <Route path='/invitation-used' element={<InvitationExpiredLayout />} />
              <Route path='/get-started' element={<GetStartedLayout />} />
              { user && (
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
                    <Route path="/logout" element={<LogoutLayout />} />
                    <Route path="/support" element={<SupportLayout />} />
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

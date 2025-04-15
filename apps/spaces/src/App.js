import styled from 'styled-components'
import { 
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { QuestionLayout } from './components/QuestionLayout';
import { HomeLayout } from './components/HomeLayout';
import { LoginLayout } from './components/LoginLayout';
import { CreateSpaceLayout } from './components/CreateSpaceLayout';
import { DashboardLayout } from './components/DashboardLayout';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';
import { useEffect } from 'react';
import { ManageQuestionLanguages } from './components/ManageQuestionLanguages';
import { ManageGlobalLanguages } from './components/ManageGlobalLanguages';
import { ToastBar, Toaster, resolveValue, toast } from 'react-hot-toast';
import { SmallCloseButton } from './components/SmallCloseButton';
import { Body1, ThemeProvider } from '@shira/ui';
import { QuizViewLayout } from './components/QuizViewLayout';
import { IoMdCheckmarkCircle } from 'react-icons/io'
import LogoutLayout from './components/LogoutLayout';
import { QuestionManagementLayout } from './components/QuestionManagementLayout';

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
              <Route path='/create-space/:passphrase' element={<CreateSpaceLayout />} />
              { user && (
                <>
                  {/* LEGACY */}
                  {/* <Route path="/legacy-question" element={<QuestionLayout />} /> */}
                  {/* <Route path="/translations" element={<ManageGlobalLanguages />} /> */}
                  {/* <Route path="/legacy-questions" element={<HomeLayout />} /> */}
                  {/* <Route path="/question/:id"  element={<QuestionLayout />} />  */}
                  {/* LEGACY */}
                  <Route path="/"  element={<DashboardLayout />} /> 
                  <Route path="/dashboard"  element={<DashboardLayout />} /> 
                  <Route path='/quiz/question' element={<QuestionManagementLayout />}/>
                  <Route path='/quiz/:id' element={<QuizViewLayout />}/>
                  <Route path="/logout"  element={<LogoutLayout />} /> 
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

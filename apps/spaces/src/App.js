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
import shallow from 'zustand/shallow';
import { useStore } from './store';
import { useEffect } from 'react';
import { ManageQuestionLanguages } from './components/ManageQuestionLanguages';
import { ManageGlobalLanguages } from './components/ManageGlobalLanguages';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { SmallCloseButton } from './components/SmallCloseButton';
import { ThemeProvider } from '@horizontal-org/shira-ui';

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
    fetchMe: state.fetchMe,
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
              <Route path='/create-space' element={<CreateSpaceLayout />} />
              { user && (
                <>
                  <Route path="/question" element={<QuestionLayout />} />
                  <Route path="/translations" element={<ManageGlobalLanguages />} />
                  <Route path="/" element={<HomeLayout />} />
                  <Route path="/question/:id"  element={<QuestionLayout />} /> 
                  <Route path="/dashboard"  element={<DashboardLayout />} /> 
                </>
              )}
            </Routes>
          </BrowserRouter>
        </Wrapper>
        <Toaster
          position="bottom-right"        
        >
          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {t.type !== 'loading' && (
                    <SmallCloseButton onClose={() => toast.dismiss(t.id)} />                  
                  )}
                </>
              )}
            </ToastBar>
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

export default App;

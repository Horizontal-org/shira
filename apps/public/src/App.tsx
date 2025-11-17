import { FunctionComponent, useEffect } from "react";
import { 
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import { MainLayout } from "./components/Layouts/MainLayout";
import { AboutLayout } from "./components/Layouts/AboutLayout";
import { ToastProvider } from "./hooks/useToast";
import './language/i18n'
import { PrivacyLayout } from "./components/Layouts/PrivacyLayout";
import { ThemeProvider, defaultTheme, styled } from "@shira/ui";
import { QuizLayout } from "./components/Layouts/QuizLayout";

interface Props {}

const App: FunctionComponent<Props> = () => {

  useEffect(() => {
  // always show banner after refresh
  localStorage.setItem('shira_hide_beta_banner', 'no')
  }, [])
  
  return (
    <Wrapper>
      <ToastProvider>
        <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
            <Routes>          
              <Route path="/" element={<MainLayout />} />
              <Route path="/about" element={<AboutLayout />} />
              <Route path='/privacy' element={<PrivacyLayout />} />
              <Route path='/quiz/:hash' element={<QuizLayout />} />
              <Route path='/learner-quiz/:hash' element={<QuizLayout />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ToastProvider>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  height: 100vh;
`

export default App 

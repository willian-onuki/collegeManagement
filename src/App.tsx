import 'react-toastify/dist/ReactToastify.css';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Colleges } from './pages/Colleges';
import { Classrooms } from './pages/Classrooms';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { RequireAuth } from './routes/RequireAuth';
import { AppProvider } from './context';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <Routes>
              <Route element={<RequireAuth />}>
                <Route
                  path='/'
                  element={<Home />}
                />
                <Route
                  path='/colleges'
                  element={<Colleges />}
                />
                <Route
                  path='/classrooms'
                  element={<Classrooms />}
                />
              </Route>
              <Route
                path='/sign-in'
                element={<SignIn />}
              />
              <Route
                path='/sign-up'
                element={<Home />}
              />
            </Routes>
          </AppProvider>
        </ThemeProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}



export default App;
